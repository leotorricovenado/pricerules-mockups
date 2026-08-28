import type {
  Company,
  CriteriaElementType,
  ExclusiveOutcome,
  OutcomeMode,
  OutcomeType,
  PaymentCondition,
  RuleType,
  ScaleType,
  SpecificElementType,
  TargetEnum,
} from "./types"

export const OUTCOME_MODE_LABELS: Record<OutcomeMode, string> = {
  SCALE: "Escala",
  FREQUENCY: "Frecuencia",
  SINGLE: "Tradicional",
  ACCUMULATED: "Acumulado",
}

// Propuesta nueva de la reunión del 2026-08-27 (CLAUDE.md §23) — outcomeMode "ACCUMULATED".
export const ACCUMULATION_SCOPE_LABELS: Record<"TOTAL" | "MARCA" | "FAMILIA" | "CATEGORIA" | "PRODUCTO", string> = {
  TOTAL: "Total de compras",
  MARCA: "Marca",
  FAMILIA: "Familia",
  CATEGORIA: "Categoría",
  PRODUCTO: "Producto específico",
}

export const RULE_TYPE_LABELS: Record<RuleType, string> = {
  GENERAL: "General",
  RESTRICTED: "Restrictivo",
  RESTRICTED_QUANTITY: "Restrictivo por Cantidad",
}

export const TARGET_LABELS: Record<TargetEnum, string> = {
  SALE_ORDER: "Pedido de Venta",
  PRODUCT: "Producto",
}

export const OUTCOME_TYPE_LABELS: Record<OutcomeType, string> = {
  DISCOUNT_PERCENTAGE: "Dscto. en porcentaje sobre el monto",
  DISCOUNT_AMOUNT: "Dscto. sobre el monto",
  FIXED_PRICE: "Precio Fijo",
  PRODUCT: "Bonificación de Productos",
  PRODUCT_SURCHARGE: "Recargo por producto",
}

export const SCALE_TYPE_LABELS: Record<ScaleType, string> = {
  QUANTITY: "Cantidad",
  AMOUNT: "Monto",
}

export const EXCLUSIVE_OUTCOME_LABELS: Record<ExclusiveOutcome, string> = {
  NONE: "Acumulable",
  OUTCOME_TYPE: "No Acumulable",
}

export const PAYMENT_CONDITION_LABELS: Record<PaymentCondition, string> = {
  TODOS: "Todos",
  CASH: "Contado",
  CREDIT: "Crédito",
  CREDIT_ON_DELIVERY: "Pronto Pago",
}

export const COMPANY_LABELS: Record<Company, string> = {
  VEMASSA: "VEMASSA",
  IVSA: "IVSA",
  FACRULESA: "FACRULESA",
}

export const CRITERIA_ELEMENT_LABELS: Record<CriteriaElementType, string> = {
  UNIVERSAL: "Universal",
  PROPIETARIO: "Propietario",
  CLIENTE: "Cliente",
  CANAL_VENTA: "Canal de venta",
  SECTOR: "Sector",
  RUTA: "Ruta",
  VENDEDOR: "Vendedor",
}

export const SPECIFIC_ELEMENT_LABELS: Record<SpecificElementType, string> = {
  UNIVERSAL: "Universal",
  DIVISION: "División",
  MARCA: "Marca",
  CATEGORIA: "Categoría",
  FAMILIA: "Familia",
  SUB_FAMILIA: "Sub-Familia",
  PRODUCTO: "Producto",
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

// dd/mm/yyyy HH:mm:ss — mismo formato que la columna "Creación" del listado JSF viejo.
export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

// createdBy guarda un username tipo "cecilia.viera" (no hay servicio de usuarios en el mockup) —
// esto es solo para mostrarlo legible en el filtro "Creador de Regla" del listado (§21).
export function formatCreatorName(username: string): string {
  return username
    .split(".")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ")
}
