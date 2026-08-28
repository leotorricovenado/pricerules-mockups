// Basado en CLAUDE.md §8 (enums reales del motor) y ESPECIFICACION-UI-CAPTURADA.md (campos del form JSF).

// Escala / Frecuencia / Tradicional / Acumulado. "ACCUMULATED" — propuesta de la reunión del
// 2026-08-27 (CLAUDE.md §23): a diferencia de los otros 3 modos, el umbral no se evalúa contra el
// pedido actual sino contra el histórico de compras del Dueño en una ventana de tiempo. Sin
// equivalente en el motor legacy (§4-8) — es una capacidad nueva, no una migración.
export type OutcomeMode = "SCALE" | "FREQUENCY" | "SINGLE" | "ACCUMULATED"
// Tipo de Resolución (default real: RESTRICTED). RESTRICTED_QUANTITY — acordado en la reunión del
// 2026-08-27 (CLAUDE.md §21) — es un RESTRICTED más estricto: no basta con que cada producto de
// Criterios Específicos esté presente en el pedido, cada uno debe cumplir además una cantidad
// mínima propia (`SpecificRow.requiredQty`). Sin equivalente en el motor legacy — comportamiento
// nuevo a implementar desde cero en el motor NestJS.
export type RuleType = "GENERAL" | "RESTRICTED" | "RESTRICTED_QUANTITY"
export type TargetEnum = "SALE_ORDER" | "PRODUCT"
export type OutcomeType =
  | "DISCOUNT_PERCENTAGE"
  | "DISCOUNT_AMOUNT"
  | "FIXED_PRICE"
  | "PRODUCT"
  | "PRODUCT_SURCHARGE"
export type ScaleType = "QUANTITY" | "AMOUNT"
export type ExclusiveOutcome = "NONE" | "OUTCOME_TYPE" // Acumulable / No Acumulable
export type PaymentCondition = "TODOS" | "CASH" | "CREDIT" | "CREDIT_ON_DELIVERY"
export type RuleStatus = "ENABLE" | "DISABLED"
export type ApprovalStatus =
  | "APPROVED"
  | "WAITING_COMMERCIAL_APPROVAL"
  | "WAITING_MANAGEMENT_APPROVAL"
  | "REJECTED"
export type Company = "VEMASSA" | "IVSA" | "FACRULESA"

export type CriteriaElementType =
  | "UNIVERSAL"
  | "PROPIETARIO"
  | "CLIENTE"
  | "CANAL_VENTA"
  | "SECTOR"
  | "RUTA"
  | "VENDEDOR"

export type SpecificElementType =
  | "UNIVERSAL"
  | "DIVISION"
  | "MARCA"
  | "CATEGORIA"
  | "FAMILIA"
  | "SUB_FAMILIA"
  | "PRODUCTO"

export interface CriteriaRow {
  id: string
  type: CriteriaElementType
  code: string
  name: string
  // Solo para type === "RUTA" — acordado en la reunión del 2026-08-27 (CLAUDE.md §21): al elegir
  // Ruta, un segundo dropdown obliga a fijar también su Canal de Venta (una ruta por sí sola es
  // ambigua entre canales).
  saleChannelId?: number
  saleChannelCode?: string
  saleChannelName?: string
}

export interface SpecificRow {
  id: string
  type: SpecificElementType
  code: string
  name: string
  unit?: string
  // Solo cuando ruleType === "RESTRICTED_QUANTITY" y type === "PRODUCTO" — cuántas unidades de
  // ESTE producto puntual exige la regla (CLAUDE.md §21), no solo su presencia en el pedido.
  requiredQty?: number
}

export interface ScaleRow {
  id: string
  from: number
  to: number | null // null = "Este valor no tiene limite" (thru: null)
  value?: number // sin valor numérico para Bonificación/Recargo — el resultado son productos, no un monto
  outcomeType?: OutcomeType // el Tipo de Resultado vigente al momento de adicionar la escala (columna "Tipo")
}

export interface OptionalProductRow {
  id: string
  code: string
  name: string
  unit: string
  qty: number
}

// Fila de "Bonificación de Productos" / "Recargo por producto": a diferencia de un producto de
// Criterios Específicos, acá la unidad SÍ se elige (dentro de la cadena de empaque del producto).
// `optionalProducts` son las equivalencias intercambiables de ESTE producto puntual — solo tiene
// sentido para Bonificación (un Recargo no tiene "regalo" que sustituir).
export interface OutcomeProductRow {
  id: string
  code: string
  name: string
  unit: string
  qty: number
  optionalProducts?: OptionalProductRow[]
}

export interface PriceRule {
  id: number
  company: Company
  name: string
  description: string
  fromDate: string // ISO yyyy-mm-dd
  thruDate: string // ISO yyyy-mm-dd — obligatorio, la vigencia no puede quedar sin límite
  outcomeMode: OutcomeMode
  applyOnlyOnce: boolean
  status: RuleStatus
  approvalStatus: ApprovalStatus
  exclusiveOutcome: ExclusiveOutcome

  // Panel "Criterios Generales"
  distributorIds: number[]
  warehouseIds: number[]
  paymentCondition: PaymentCondition

  // Panel "Criterios de la Regla" (el "quién")
  criteriaRows: CriteriaRow[]

  // Panel "Criterios Específicos" (el "sobre qué producto")
  ruleType: RuleType
  specificRows: SpecificRow[]

  // Panel "Configuración del Resultado Esperado"
  target: TargetEnum
  outcomeType: OutcomeType
  value?: number // Tradicional/Frecuencia/Acumulado con resultado numérico (%, monto o precio fijo)
  scaleType?: ScaleType // Tipo de Validación — cuando outcomeMode es SCALE o FREQUENCY
  scales?: ScaleRow[] // solo si outcomeMode === SCALE
  frequency?: number // solo si outcomeMode === FREQUENCY

  // Solo si outcomeMode === "ACCUMULATED" (CLAUDE.md §23). El "quién" sigue siendo Criterios de la
  // Regla como cualquier otra regla, pero la sumatoria del acumulado siempre agrupa por Dueño — no
  // es configurable a otra granularidad en esta primera propuesta. El total lo entregaría Sales
  // (confirmado en la reunión), no un cálculo propio de Reglas de Precio — pendiente definir si esa
  // consulta es en vivo o precalculada (CLAUDE.md §23). `accumulationScope` es una sola dimensión
  // (no una lista como Criterios Específicos) — "acumular SOLO lo de esta marca", no "esta marca O
  // esta otra".
  accumulationScope?: "TOTAL" | "MARCA" | "FAMILIA" | "CATEGORIA" | "PRODUCTO"
  accumulationScopeRef?: { code: string; name: string } // qué marca/familia/categoría/producto — vacío si scope es TOTAL
  // Rango de fechas fijo (no "últimos N días") — mismo criterio Desde/Hasta que fromDate/thruDate
  // de la regla, pero independiente: la ventana de acumulación no tiene por qué coincidir con la
  // vigencia de la regla.
  accumulationFromDate?: string // ISO yyyy-mm-dd
  accumulationToDate?: string // ISO yyyy-mm-dd
  accumulationThreshold?: number // monto en Bs que el Dueño debe superar para que la regla se active
  /** @deprecated reemplazado por `outcomeProducts` — se mantiene solo para no romper reglas ya guardadas con el modelo viejo (un solo producto). */
  bonusProduct?: { code: string; name: string; unit: string; qty: number }
  outcomeProducts?: OutcomeProductRow[] // Bonificación de Productos / Recargo por producto (múltiples filas)
  optionalProducts?: OptionalProductRow[] // equivalencias del producto de regalo (solo Bonificación)

  createdBy: string
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime
}

export const emptyRule = (): Omit<PriceRule, "id" | "createdBy" | "createdAt" | "updatedAt"> => ({
  company: "VEMASSA",
  name: "",
  description: "",
  fromDate: "",
  thruDate: "",
  outcomeMode: "SINGLE",
  applyOnlyOnce: false,
  status: "DISABLED",
  approvalStatus: "WAITING_COMMERCIAL_APPROVAL",
  exclusiveOutcome: "NONE",
  distributorIds: [],
  warehouseIds: [],
  paymentCondition: "TODOS",
  criteriaRows: [],
  ruleType: "RESTRICTED",
  specificRows: [],
  target: "PRODUCT",
  // Consistente con outcomeMode: "SINGLE" por defecto — Tradicional solo admite Bonificación de
  // Productos (CLAUDE.md §22).
  outcomeType: "PRODUCT",
  value: undefined,
  scaleType: "QUANTITY",
  scales: [],
  frequency: undefined,
  outcomeProducts: [],
  optionalProducts: [],
})
