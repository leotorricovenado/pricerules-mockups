// Motor de simulación del mockup — CLAUDE.md §29 (caso B). Implementa, en TypeScript y sobre datos
// en memoria, una aproximación razonable del algoritmo real documentado en §8 (matching, escalas,
// frecuencia) y §27 (resolución de canastas por outcomeType + exclusividad cruzada). NO es un port
// 1:1 del JAR: simplifica los 11 bits de matching de §8.1 a los campos que el formulario de este
// mockup realmente captura (Criterios Generales/de la Regla/Específicos), y dentro de una regla
// todas las filas de `criteriaRows` (o de `specificRows`) son del MISMO tipo — el propio
// CriteriaRowsPanel/SpecificRowsPanel del mockup lo garantiza (bloquea el selector de tipo apenas
// hay una fila cargada). El port fiel a los 11 bits queda para la Fase 4 (motor NestJS real).
//
// Capa 1 (`accumulative`, suma de reglas dentro de un mismo outcomeType) NO se implementa a
// propósito — CLAUDE.md §27 confirmó con datos reales de producción que esa capa nunca se ejercita
// (accumulative=false en el 100% de las reglas, en desarrollo y en producción). Portarla sería
// simular un comportamiento que el sistema real nunca produce.

import {
  BRANDS,
  CATEGORIES,
  DIVISIONS,
  FAMILIES,
  OWNERS,
  PRODUCTS,
  ROUTES,
  SALE_CHANNELS,
  SELLERS,
  SUB_FAMILIES,
  SUB_SALE_CHANNELS,
  findById,
  type ProductCatalogItem,
} from "../data/catalogs"
import type { CriteriaRow, OutcomeType, PriceRule, RuleType, SpecificRow } from "../types"
import type {
  BucketCandidate,
  BucketResult,
  LineSimulationResult,
  OrderLevelSimulationResult,
  SimulationResult,
  TestCustomer,
  TestOrder,
  TestOrderLine,
  TieBreakFlags,
} from "./types"

// Orden fijo en el que el motor real evalúa exclusividad cruzada (CLAUDE.md §27: "primero evaluado
// en el orden fijo gana y bloquea a los demás tipos") — coincide con el orden de
// OUTCOME_TYPE_LABELS en labels.ts.
const OUTCOME_TYPE_ORDER: OutcomeType[] = [
  "DISCOUNT_PERCENTAGE",
  "DISCOUNT_AMOUNT",
  "FIXED_PRICE",
  "PRODUCT",
  "PRODUCT_SURCHARGE",
]

function resolveCode(list: { id: number; code: string }[], id: number | undefined): string | undefined {
  if (id == null) return undefined
  return list.find((i) => i.id === id)?.code
}

function resolvedLine(line: TestOrderLine): { product: ProductCatalogItem; subtotal: number } | null {
  const product = PRODUCTS.find((p) => p.id === line.productId)
  if (!product) return null
  return { product, subtotal: line.quantity * line.unitPrice }
}

// ---------------------------------------------------------------------------
// Criterios Generales (distribuidor / almacén / condición de pago)
// ---------------------------------------------------------------------------

function generalCriteriaOk(rule: PriceRule, order: TestOrder): boolean {
  if (rule.distributorIds.length > 0 && order.distributorId != null && !rule.distributorIds.includes(order.distributorId)) {
    return false
  }
  if (rule.warehouseIds.length > 0 && order.warehouseId != null && !rule.warehouseIds.includes(order.warehouseId)) {
    return false
  }
  if (rule.paymentCondition !== "TODOS" && rule.paymentCondition !== order.paymentCondition) {
    return false
  }
  return true
}

function dateOk(rule: PriceRule, order: TestOrder): boolean {
  return order.orderDate >= rule.fromDate && order.orderDate <= rule.thruDate
}

// ---------------------------------------------------------------------------
// Criterios de la Regla (el "quién") — CLAUDE.md §8.2: GENERAL=anyMatch, RESTRICTED(_QUANTITY)=allMatch
// ---------------------------------------------------------------------------

function customerMatchesRow(row: CriteriaRow, customer: TestCustomer): boolean {
  switch (row.type) {
    case "UNIVERSAL":
      return true
    case "PROPIETARIO":
      return resolveCode(OWNERS, customer.ownerId) === row.code
    case "CLIENTE":
      return customer.mode === "REAL" && String(customer.realCustomerId) === row.code
    case "CANAL_VENTA":
      return resolveCode(SALE_CHANNELS, customer.saleChannelId) === row.code
    case "SUBCANAL":
      return resolveCode(SUB_SALE_CHANNELS, customer.subSaleChannelId) === row.code
    case "RUTA":
      return (
        resolveCode(ROUTES, customer.routeId) === row.code &&
        resolveCode(SALE_CHANNELS, customer.saleChannelId) === row.saleChannelCode
      )
    case "VENDEDOR":
      return resolveCode(SELLERS, customer.sellerId) === row.code
    default:
      return false
  }
}

function whoMatches(rule: PriceRule, order: TestOrder): boolean {
  if (rule.criteriaRows.length === 0) return true
  const results = rule.criteriaRows.map((row) => customerMatchesRow(row, order.customer))
  return rule.ruleType === "GENERAL" ? results.some(Boolean) : results.every(Boolean)
}

// ---------------------------------------------------------------------------
// Criterios Específicos (el "sobre qué producto")
// ---------------------------------------------------------------------------

function productMatchesRow(row: SpecificRow, product: ProductCatalogItem): boolean {
  switch (row.type) {
    case "UNIVERSAL":
      return true
    case "PRODUCTO":
      return product.code === row.code
    case "MARCA":
      return resolveCode(BRANDS, product.brandId) === row.code
    case "CATEGORIA":
      return resolveCode(CATEGORIES, product.categoryId) === row.code
    case "FAMILIA":
      return resolveCode(FAMILIES, product.familyId) === row.code
    case "SUB_FAMILIA":
      return resolveCode(SUB_FAMILIES, product.subFamilyId) === row.code
    case "DIVISION":
      return resolveCode(DIVISIONS, product.divisionId) === row.code
    default:
      return false
  }
}

// "Restrictivo por Cantidad" (§21): una fila PRODUCTO exige además una cantidad mínima propia de
// ESE producto puntual, no solo su presencia en el pedido.
function lineSatisfiesQuantity(row: SpecificRow, ruleType: RuleType, line: TestOrderLine): boolean {
  if (ruleType !== "RESTRICTED_QUANTITY" || row.type !== "PRODUCTO" || !row.requiredQty) return true
  return line.quantity >= row.requiredQty
}

// Existencia a nivel de PEDIDO — CLAUDE.md §8.2: en RESTRICTED, "todos los productos de la regla
// deben estar presentes en el pedido". Acá se generaliza a cualquier tipo de fila (no solo PRODUCTO).
function whatMatchesAtOrderLevel(rule: PriceRule, order: TestOrder): boolean {
  if (rule.specificRows.length === 0) return true
  const rowHasMatchingLine = (row: SpecificRow) =>
    order.lines.some((line) => {
      const resolved = resolvedLine(line)
      if (!resolved) return false
      return productMatchesRow(row, resolved.product) && lineSatisfiesQuantity(row, rule.ruleType, line)
    })
  return rule.ruleType === "GENERAL" ? rule.specificRows.some(rowHasMatchingLine) : rule.specificRows.every(rowHasMatchingLine)
}

// Una vez que la regla es aplicable al pedido entero, ¿esta línea puntual recibe el resultado?
// GENERAL/RESTRICTED ya se validó a nivel de pedido arriba — acá basta con "esta línea calza
// alguna de las filas específicas" (o no hay filas → Universal → aplica a todas).
function lineIsEligible(rule: PriceRule, line: TestOrderLine, product: ProductCatalogItem): boolean {
  if (rule.specificRows.length === 0) return true
  return rule.specificRows.some((row) => productMatchesRow(row, product) && lineSatisfiesQuantity(row, rule.ruleType, line))
}

export interface ApplicabilityResult {
  applicable: boolean
  reason?: string
}

export function isRuleApplicable(rule: PriceRule, order: TestOrder): ApplicabilityResult {
  if (rule.status !== "ENABLE" && rule.approvalStatus !== "WAITING_COMMERCIAL_APPROVAL" && rule.approvalStatus !== "WAITING_MANAGEMENT_APPROVAL") {
    return { applicable: false, reason: "No está activa ni pendiente de aprobación" }
  }
  if (!dateOk(rule, order)) return { applicable: false, reason: `Fuera de vigencia (${rule.fromDate} a ${rule.thruDate})` }
  if (!generalCriteriaOk(rule, order)) return { applicable: false, reason: "No calza Distribuidora/Almacén/Condición de pago" }
  if (!whoMatches(rule, order)) return { applicable: false, reason: 'No calza Criterios de la Regla (el "quién")' }
  if (!whatMatchesAtOrderLevel(rule, order)) return { applicable: false, reason: "No calza Criterios Específicos (el producto no está en el pedido)" }
  if (rule.outcomeMode === "ACCUMULATED") {
    const accumulated = order.accumulatedPurchases ?? 0
    if (accumulated < (rule.accumulationThreshold ?? Infinity)) {
      return { applicable: false, reason: `Acumulado ingresado (Bs ${accumulated}) no supera el umbral (Bs ${rule.accumulationThreshold})` }
    }
  }
  return { applicable: true }
}

// ---------------------------------------------------------------------------
// Valorización del resultado — CLAUDE.md §8.4-§8.6
// ---------------------------------------------------------------------------

interface OutcomeValue {
  value: number // siempre expresado como "beneficio al cliente" (más grande = más generoso)
  label: string
  giftLines?: string[]
}

function referencePrice(code: string): number {
  return PRODUCTS.find((p) => p.code === code)?.referencePrice ?? 0
}

function giftValueAndLabel(rule: PriceRule, times = 1): { value: number; label: string; lines: string[] } {
  const products = rule.outcomeProducts ?? (rule.bonusProduct ? [{ ...rule.bonusProduct, id: "legacy" }] : [])
  let value = 0
  const lines: string[] = []
  for (const p of products) {
    const qty = p.qty * times
    const unitValue = referencePrice(p.code)
    value += qty * unitValue
    lines.push(`${qty}x ${p.name}`)
  }
  return { value, label: lines.length > 0 ? `Regalo: ${lines.join(", ")}` : "Regalo (sin productos configurados)", lines }
}

// base: monto/cantidad contra la que se evalúa la regla (subtotal de la línea, o del pedido si
// target=SALE_ORDER). qty: cantidad de producto (para FREQUENCY/escala por cantidad).
function computeOutcomeValue(rule: PriceRule, base: { subtotal: number; qty: number }): OutcomeValue | null {
  const isMoneyOutcome = rule.outcomeType === "DISCOUNT_PERCENTAGE" || rule.outcomeType === "DISCOUNT_AMOUNT" || rule.outcomeType === "FIXED_PRICE"

  switch (rule.outcomeMode) {
    case "SINGLE": {
      if (rule.outcomeType === "PRODUCT" || rule.outcomeType === "PRODUCT_SURCHARGE") {
        const g = giftValueAndLabel(rule)
        return { value: g.value, label: g.label, giftLines: g.lines }
      }
      if (rule.value == null) return null
      return moneyOutcomeValue(rule.outcomeType, rule.value)
    }
    case "SCALE": {
      const measure = rule.scaleType === "QUANTITY" ? base.qty : base.subtotal
      // Primera coincidencia gana, sin ORDER BY — CLAUDE.md §8.4. El array ya está en el orden en
      // que se cargó la regla, así que "primera que calza" = rules.scales[0] que matchea, igual
      // que el comportamiento real (no determinístico si hay rangos solapados).
      const bracket = (rule.scales ?? []).find((s) => measure >= s.from && (s.to == null || measure <= s.to))
      if (!bracket) return null
      if (rule.outcomeType === "PRODUCT" || rule.outcomeType === "PRODUCT_SURCHARGE") {
        const g = giftValueAndLabel(rule)
        return { value: g.value, label: g.label, giftLines: g.lines }
      }
      if (bracket.value == null) return null
      if (isMoneyOutcome && bracket.value === 0) {
        return { value: 0, label: `Escala ${bracket.from}-${bracket.to ?? "∞"}: sin descuento en este rango` }
      }
      return moneyOutcomeValue(rule.outcomeType, bracket.value)
    }
    case "FREQUENCY": {
      if (!rule.frequency || rule.frequency <= 0) return null
      const measure = rule.scaleType === "AMOUNT" ? base.subtotal : base.qty
      if (measure < rule.frequency) return null
      const times = Math.floor(measure / rule.frequency)
      if (times <= 0) return null
      if (rule.outcomeType === "PRODUCT" || rule.outcomeType === "PRODUCT_SURCHARGE") {
        const g = giftValueAndLabel(rule, times)
        return { value: g.value, label: `${g.label} (x${times} por frecuencia)`, giftLines: g.lines }
      }
      if (rule.value == null) return null
      return moneyOutcomeValue(rule.outcomeType, rule.value * times)
    }
    case "ACCUMULATED": {
      // El gate (¿superó el umbral?) ya se validó en isRuleApplicable — acá solo se valoriza.
      if (rule.outcomeType === "PRODUCT" || rule.outcomeType === "PRODUCT_SURCHARGE") {
        const g = giftValueAndLabel(rule)
        return { value: g.value, label: g.label, giftLines: g.lines }
      }
      if (rule.value == null) return null
      return moneyOutcomeValue(rule.outcomeType, rule.value)
    }
    default:
      return null
  }

  function moneyOutcomeValue(type: OutcomeType, raw: number): OutcomeValue {
    if (type === "DISCOUNT_PERCENTAGE") {
      const amount = base.subtotal * (raw / 100)
      return { value: amount, label: `${raw}% → Bs ${amount.toFixed(2)} de descuento` }
    }
    if (type === "DISCOUNT_AMOUNT") {
      return { value: raw, label: `Bs ${raw.toFixed(2)} de descuento` }
    }
    // FIXED_PRICE: "valor" para comparar = cuánto más barato queda vs. el precio actual de la línea
    // (mientras más grande, mejor para el cliente) — así encaja en la misma escala "MIN gana hoy"
    // que el resto de los tipos sin necesitar una dirección de comparación aparte.
    const saved = Math.max(0, base.subtotal - raw)
    return { value: saved, label: `Precio fijo Bs ${raw.toFixed(2)} (ahorro Bs ${saved.toFixed(2)})` }
  }
}

// ---------------------------------------------------------------------------
// Resolución de canastas — CLAUDE.md §27: un único ganador por outcomeType, MIN gana cuando la
// bandera GIVE_THE_GREATER_* correspondiente está en false (el valor real hoy en producción para
// las 6), MAX gana cuando está en true. `value` ya está expresado como "beneficio al cliente" en
// las 5 canastas (ver computeOutcomeValue), así que una sola regla de comparación sirve para todas.
// ---------------------------------------------------------------------------

function resolveBuckets(
  candidatesByType: Map<OutcomeType, BucketCandidate[]>,
  flags: TieBreakFlags
): BucketResult[] {
  const buckets: BucketResult[] = OUTCOME_TYPE_ORDER.filter((t) => (candidatesByType.get(t)?.length ?? 0) > 0).map((outcomeType) => {
    const candidates = candidatesByType.get(outcomeType)!
    const givesGreater = flags[outcomeType]
    const winner = candidates.reduce<BucketCandidate | null>((best, c) => {
      if (!best) return c
      return givesGreater ? (c.value > best.value ? c : best) : (c.value < best.value ? c : best)
    }, null)
    return {
      outcomeType,
      candidates: candidates.map((c) => ({ ...c, won: c === winner })),
      winner: winner ? { ...winner, won: true } : null,
      blockedByExclusivity: false,
    }
  })

  // Exclusividad cruzada (Capa 2, §27): la primera canasta ganadora (en el orden fijo) cuya regla
  // tenga exclusiveOutcome=OUTCOME_TYPE se queda con el pedido y bloquea a las demás.
  const exclusiveWinnerBucket = buckets.find((b) => b.winner && b.winner.exclusiveOutcome === "OUTCOME_TYPE")
  if (exclusiveWinnerBucket) {
    for (const b of buckets) {
      if (b !== exclusiveWinnerBucket && b.winner) {
        b.blockedByExclusivity = true
        b.blockedByRuleName = exclusiveWinnerBucket.winner!.ruleName
      }
    }
  }
  return buckets
}

function applyBucketsToTotal(subtotal: number, buckets: BucketResult[]): number {
  let total = subtotal
  for (const b of buckets) {
    if (!b.winner || b.blockedByExclusivity) continue
    if (b.outcomeType === "DISCOUNT_PERCENTAGE" || b.outcomeType === "DISCOUNT_AMOUNT" || b.outcomeType === "FIXED_PRICE") {
      total -= b.winner.value
    }
    // PRODUCT/PRODUCT_SURCHARGE no cambian el total de la línea comprada — agregan una línea
    // sintética aparte (el regalo/recargo), igual que el motor real (§8.7: id=0/-1, descuento 100%).
  }
  return Math.max(0, total)
}

// ---------------------------------------------------------------------------
// Orquestación
// ---------------------------------------------------------------------------

export function runSimulation(rules: PriceRule[], order: TestOrder, flags: TieBreakFlags): SimulationResult {
  const applicability = rules.map((rule) => ({ rule, ...isRuleApplicable(rule, order) }))
  const applicableRules = applicability.filter((a) => a.applicable).map((a) => a.rule)
  const notApplicableRuleIds = applicability
    .filter((a) => !a.applicable)
    .map((a) => ({ ruleId: a.rule.id, ruleName: a.rule.name, reason: a.reason ?? "No aplica" }))

  const productRules = applicableRules.filter((r) => r.target === "PRODUCT")
  const orderRules = applicableRules.filter((r) => r.target === "SALE_ORDER")

  const lines: LineSimulationResult[] = order.lines
    .map((line) => {
      const resolved = resolvedLine(line)
      if (!resolved) return null
      const { product, subtotal } = resolved
      const eligibleRules = productRules.filter((r) => lineIsEligible(r, line, product))

      const candidatesByType = new Map<OutcomeType, BucketCandidate[]>()
      const applicableRuleIdsForLine: number[] = []
      for (const rule of eligibleRules) {
        const outcome = computeOutcomeValue(rule, { subtotal, qty: line.quantity })
        if (!outcome) continue
        applicableRuleIdsForLine.push(rule.id)
        const list = candidatesByType.get(rule.outcomeType) ?? []
        list.push({
          ruleId: rule.id,
          ruleName: rule.name,
          value: outcome.value,
          valueLabel: outcome.label,
          won: false,
          exclusiveOutcome: rule.exclusiveOutcome,
        })
        candidatesByType.set(rule.outcomeType, list)
      }

      const buckets = resolveBuckets(candidatesByType, flags)
      const finalTotal = applyBucketsToTotal(subtotal, buckets)

      return {
        lineId: line.id,
        productName: product.name,
        productCode: product.code,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        subtotal,
        applicableRuleIds: applicableRuleIdsForLine,
        buckets,
        finalTotal,
      }
    })
    .filter((l): l is LineSimulationResult => l !== null)

  let orderLevel: OrderLevelSimulationResult | null = null
  if (orderRules.length > 0) {
    const orderSubtotal = lines.reduce((sum, l) => sum + l.subtotal, 0)
    const orderQty = order.lines.reduce((sum, l) => sum + l.quantity, 0)
    const candidatesByType = new Map<OutcomeType, BucketCandidate[]>()
    const applicableRuleIdsForOrder: number[] = []
    for (const rule of orderRules) {
      const outcome = computeOutcomeValue(rule, { subtotal: orderSubtotal, qty: orderQty })
      if (!outcome) continue
      applicableRuleIdsForOrder.push(rule.id)
      const list = candidatesByType.get(rule.outcomeType) ?? []
      list.push({
        ruleId: rule.id,
        ruleName: rule.name,
        value: outcome.value,
        valueLabel: outcome.label,
        won: false,
        exclusiveOutcome: rule.exclusiveOutcome,
      })
      candidatesByType.set(rule.outcomeType, list)
    }
    const buckets = resolveBuckets(candidatesByType, flags)
    orderLevel = {
      subtotal: orderSubtotal,
      applicableRuleIds: applicableRuleIdsForOrder,
      buckets,
      finalTotal: applyBucketsToTotal(orderSubtotal, buckets),
    }
  }

  const grandTotalBefore = lines.reduce((sum, l) => sum + l.subtotal, 0)
  const grandTotalAfter =
    orderLevel != null
      ? orderLevel.finalTotal
      : lines.reduce((sum, l) => sum + l.finalTotal, 0)

  return {
    ruleCountConsidered: rules.length,
    ruleCountApplicable: applicableRules.length,
    notApplicableRuleIds,
    lines,
    orderLevel,
    grandTotalBefore,
    grandTotalAfter,
  }
}
