// Convierte un export JSON del listado real (`pricerule_list.jsf` / endpoint DataTables actual)
// en `src/features/price-rules/data/venado-price-rules.ts`, para que los mockups usen nombres,
// fechas y estados reales de Grupo Venado en vez de datos inventados.
//
// El endpoint solo expone campos de listado (id, nombre, fechas, estado, tipo de resultado) — NO
// expone distribuidoras/criterios/valores. Esos se infieren con heurísticas de texto sobre el
// nombre/descripción (ciudad, marca, cliente, ratio "X+Y" de bonificación, "%" de descuento) y
// quedan documentados inline. Cuando no se detecta nada, el campo se deja vacío ("Universal" —
// sin restricción) en vez de inventar un dato que no está.
//
// Uso: node scripts/import-price-rules.mjs [ruta-al-json] [ruta-de-salida.ts]

import fs from "node:fs"

const SRC = process.argv[2] ?? "src/features/price-rules/data/result-100,json"
const OUT = process.argv[3] ?? "src/features/price-rules/data/venado-price-rules.ts"

const raw = fs.readFileSync(SRC, "utf8")
const json = JSON.parse(raw)

// company_id 1/2/3 confirmado en CLAUDE.md §16 (VEMASSA=2, IVSA=1, FACRULESA=3). El dato real trae
// también company_id=0 (~16% de la muestra) — CLAUDE.md §11 ya marcaba que el particionamiento por
// empresa "posiblemente" no se aplica a conciencia; acá se cae a VEMASSA para no romper el tipo.
const COMPANY_MAP = { 0: "VEMASSA", 1: "IVSA", 2: "VEMASSA", 3: "FACRULESA" }

const OUTCOME_TYPE_MAP = {
  "dscto. sobre el monto": "DISCOUNT_AMOUNT",
  "dscto. en porcentaje sobre el monto": "DISCOUNT_PERCENTAGE",
  "bonificacion de productos": "PRODUCT",
  "bonificación de productos": "PRODUCT",
  "precio fijo": "FIXED_PRICE",
  "recargo por producto": "PRODUCT_SURCHARGE",
}

const RULE_TYPE_MAP = { General: "GENERAL", Restrictivo: "RESTRICTED" }

// Aprobadores reales listados en CLAUDE.md §9 (PRICING_ENABLE_USERS_FOR_APPROVING_RULE_APP) — el
// endpoint de listado no expone quién creó la regla, así que se reparten cíclicamente como relleno.
const APPROVERS = [
  "fernando.unzueta",
  "angel.franco",
  "sergio.rosso",
  "ernesto.montero",
  "carlos.ugalde",
  "genaro.valverde",
  "cecilia.viera",
]

const CITY_DISTRIBUTOR = [
  [/\bSCZ\b|\bSCR\b/i, 1], // DISCRUZ
  [/\bCBB\b|\bCBBA\b/i, 3], // COCHABAMBA
  [/\bTJA\b/i, 4], // DISTAR
  [/\bEAL\b/i, 10], // DISALTO
  [/\bLPZ\b/i, 2], // DISPAZ
]

const BRANDS_BY_ID = {
  4: "Kris",
  12: "Real",
  23: "Pulpin",
  31: "Bristar",
  45: "De La Granja",
  52: "Speranza",
  68: "El Pescador",
  77: "Ingavi",
}
const BRAND_KEYWORDS = [
  [/\bKRIS\b/i, 4],
  [/\bREAL\b/i, 12],
  [/\bPULPIN\b/i, 23],
  [/\bBRISTAR\b|\bBRISPACK\b/i, 31],
  [/DE LA GRANJA|\bDLG\b/i, 45],
  [/SPERANZA/i, 52],
  [/PESCADOR/i, 68],
  [/INGAVI/i, 77],
]

const CUSTOMER_KEYWORDS = [
  [/RINCONADA/i, 200002, "Rinconada SRL"],
  [/HIPERMAXI/i, 200001, "Hipermaxi S.A."],
  [/TRESBEDE/i, 200003, "Tresbede"],
]

function parseDate(d) {
  const [dd, mm, yyyy] = d.split("/")
  return `${yyyy}-${mm}-${dd}`
}

function parseDateTime(dt) {
  const [datePart, timePart] = dt.split(" ")
  return `${parseDate(datePart)}T${timePart}`
}

function extractPercent(text) {
  const m = text.match(/(\d+[.,]\d+|\d+)\s?%/)
  if (!m) return undefined
  return parseFloat(m[1].replace(",", "."))
}

// Patrones "X+Y" de bonificación por volumen: "6+1", "50CJS+9.5CJS", "16 UN +3 UN", "200 UNI +28 UN".
// Captura la palabra-unidad de cada número (si hay) en vez de usar una lista blanca fija — el dato
// real trae demasiadas variantes (UN/UNI/UNID/UNIDAD/CJS/CJ...). Solo se descarta el candidato si
// esa palabra-unidad es una MEDIDA de envase (ML/GR/KG/...), p. ej. "1050+600ML" no es una ratio de
// bonificación, es el tamaño de dos envases distintos.
const SIZE_UNIT = /^(ML|MLS|GR|GRS|KG|CC|L|LT|LTS)$/
function extractBonusRatio(text) {
  const re =
    /(\d+(?:[.,]\d+)?)\s*([A-Za-zÁÉÍÓÚáéíóúñÑ]*)\s*\+\s*(\d+(?:[.,]\d+)?)\s*([A-Za-zÁÉÍÓÚáéíóúñÑ]*)/g
  let m
  while ((m = re.exec(text))) {
    if (SIZE_UNIT.test(m[2].toUpperCase()) || SIZE_UNIT.test(m[4].toUpperCase())) continue
    const frequency = Math.round(parseFloat(m[1].replace(",", ".")))
    const qty = Math.round(parseFloat(m[3].replace(",", ".")))
    if (frequency < 1 || qty < 1 || frequency > 1000 || qty > 200) continue
    return { frequency, qty }
  }
  return undefined
}

function detectDistributor(text) {
  for (const [re, id] of CITY_DISTRIBUTOR) if (re.test(text)) return [id]
  return []
}

function detectBrand(text) {
  for (const [re, id] of BRAND_KEYWORDS) if (re.test(text)) return id
  return undefined
}

function detectCustomer(text) {
  for (const [re, id, name] of CUSTOMER_KEYWORDS) if (re.test(text)) return { id, name }
  return undefined
}

let skipped = 0
const rules = json.data
  .map((d) => {
    if (!d.fromDate || !d.thruDate) {
      skipped++
      return null
    }
    const text = `${d.name} ${d.description}`
    const outcomeType = OUTCOME_TYPE_MAP[d.outcomeType.trim().toLowerCase()] ?? "DISCOUNT_PERCENTAGE"
    const ruleType = RULE_TYPE_MAP[d.ruleType] ?? "RESTRICTED"
    const company = COMPANY_MAP[d.companyId] ?? "VEMASSA"
    const distributorIds = detectDistributor(text)
    const brandId = detectBrand(text)
    const customer = detectCustomer(text)
    const createdAt = parseDateTime(d.dateCreation)
    const approver = APPROVERS[d.id % APPROVERS.length]

    const brandCode = brandId ? `MARCA-${String(brandId).padStart(2, "0")}` : undefined
    const specificRows = brandId
      ? [{ id: `s${d.id}`, type: "MARCA", code: brandCode, name: BRANDS_BY_ID[brandId] }]
      : []
    const criteriaRows = customer
      ? [{ id: `c${d.id}`, type: "CLIENTE", code: String(customer.id), name: customer.name }]
      : []

    const rule = {
      id: d.id,
      company,
      name: d.name.trim(),
      description: d.description.trim(),
      fromDate: parseDate(d.fromDate),
      thruDate: parseDate(d.thruDate),
      outcomeMode: "SINGLE",
      applyOnlyOnce: false,
      status: d.valid ? "ENABLE" : "DISABLED",
      approvalStatus: d.approvalStatusEnum,
      exclusiveOutcome: "NONE",
      distributorIds,
      warehouseIds: [],
      roleTypes: [],
      paymentCondition: "TODOS",
      criteriaRows,
      useSaleOrderTotalForOutcome: false,
      ruleType,
      specificRows,
      target: "PRODUCT",
      outcomeType,
      createdBy: approver,
      createdAt,
      updatedAt: createdAt,
    }

    if (outcomeType === "PRODUCT") {
      const ratio = extractBonusRatio(text)
      rule.outcomeMode = ratio ? "FREQUENCY" : "SINGLE"
      if (ratio) rule.frequency = ratio.frequency
      rule.bonusProduct = {
        code: brandCode ?? "N/D",
        name: brandId ? `Producto ${BRANDS_BY_ID[brandId]} (bonificación)` : "Producto de regalo",
        unit: "UN",
        qty: ratio?.qty ?? 1,
      }
    } else {
      // Placeholder cuando el nombre no trae un "%" explícito — el endpoint de listado no expone
      // el valor real de la regla, así que esto NO es el dato de producción.
      rule.value = extractPercent(text) ?? (outcomeType === "DISCOUNT_AMOUNT" ? 20 : 5)
    }

    return rule
  })
  .filter(Boolean)

const header = `// GENERADO por scripts/import-price-rules.mjs a partir de result-100,json (export real del
// listado de Grupo Venado). Distribuidoras/marcas/clientes se infirieron por texto — ver el
// comentario del script para el detalle de qué es dato real y qué es heurística.
// No editar a mano: volver a correr el script si llega un export más nuevo.
import type { PriceRule } from "../types"

export const VENADO_PRICE_RULES: PriceRule[] = `

fs.writeFileSync(OUT, header + JSON.stringify(rules, null, 2) + "\n")
console.log(`Escritas ${rules.length} reglas en ${OUT} (omitidas ${skipped} sin fromDate/thruDate).`)
