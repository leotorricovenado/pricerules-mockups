// Basado en CLAUDE.md §8 (enums reales del motor) y ESPECIFICACION-UI-CAPTURADA.md (campos del form JSF).

export type OutcomeMode = "SCALE" | "FREQUENCY" | "SINGLE" // Escala / Frecuencia / Tradicional
export type RuleType = "GENERAL" | "RESTRICTED" // Tipo de Resolución (default real: RESTRICTED)
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
}

export interface SpecificRow {
  id: string
  type: SpecificElementType
  code: string
  name: string
  unit?: string
}

export interface ScaleRow {
  id: string
  from: number
  to: number | null // null = "Este valor no tiene limite" (thru: null)
  value: number
}

export interface OptionalProductRow {
  id: string
  code: string
  name: string
  unit: string
  qty: number
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
  roleTypes: string[]
  paymentCondition: PaymentCondition

  // Panel "Criterios de la Regla" (el "quién")
  criteriaRows: CriteriaRow[]

  // Panel "Criterios Específicos" (el "sobre qué producto")
  useSaleOrderTotalForOutcome: boolean
  ruleType: RuleType
  specificRows: SpecificRow[]

  // Panel "Configuración del Resultado Esperado"
  target: TargetEnum
  outcomeType: OutcomeType
  value?: number // para Tradicional (SINGLE): valor simple del resultado
  scaleType?: ScaleType // solo si outcomeMode === SCALE
  scales?: ScaleRow[] // solo si outcomeMode === SCALE
  frequency?: number // solo si outcomeMode === FREQUENCY
  bonusProduct?: { code: string; name: string; unit: string; qty: number }
  optionalProducts?: OptionalProductRow[]

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
  roleTypes: [],
  paymentCondition: "TODOS",
  criteriaRows: [],
  useSaleOrderTotalForOutcome: false,
  ruleType: "RESTRICTED",
  specificRows: [],
  target: "PRODUCT",
  outcomeType: "DISCOUNT_PERCENTAGE",
  value: undefined,
  scaleType: "QUANTITY",
  scales: [],
  frequency: undefined,
  optionalProducts: [],
})
