// Tipos del "Pedido de prueba" y del resultado de la simulación — CLAUDE.md §29, caso de uso B
// ("Competencia entre varias" — elegir un conjunto de reglas y ver qué le da el sistema a un
// pedido de prueba). No es el contrato final de `POST /price-rules/simulate` (eso se cierra en
// Fase 4, cuando el motor real viva en NestJS) — es la forma mínima que el motor de este mockup
// necesita para poder calcular algo reconocible.

import type { OutcomeType, PriceRule } from "../types"

// "GENERIC": el pedido de prueba no referencia a ningún cliente real, solo sus atributos sueltos
// (Propietario/Canal/Subcanal/Ruta/Vendedor) — decisión 2 de CLAUDE.md §29.
// "REAL": se eligió un cliente real del buscador — permite ver el candado de apply_only_once.
export interface TestCustomer {
  mode: "GENERIC" | "REAL"
  realCustomerId?: number
  ownerId?: number
  saleChannelId?: number
  subSaleChannelId?: number
  routeId?: number
  sellerId?: number
}

export interface TestOrderLine {
  id: string
  productId: number
  quantity: number
  unitPrice: number
}

export interface TestOrder {
  orderDate: string // ISO yyyy-mm-dd — para validar vigencia (fromDate/thruDate) de cada regla
  distributorId: number | null
  warehouseId: number | null
  paymentCondition: "CASH" | "CREDIT" | "CREDIT_ON_DELIVERY"
  customer: TestCustomer
  lines: TestOrderLine[]
  // Lo que Sales reportaría como compras acumuladas del Dueño en la ventana de la regla (CLAUDE.md
  // §23) — acá no hay Sales real, así que se ingresa a mano solo para poder probar reglas
  // outcomeMode "ACCUMULATED".
  accumulatedPurchases?: number
}

// Las 6 banderas de desempate (CLAUDE.md §9/§28) — en esta primera versión del simulador viven
// como estado de sesión de la pantalla, no como configuración persistida (eso es el endpoint
// GET/PUT /price-rules/settings de §28, todavía no implementado). Los valores por defecto acá
// SON los reales de producción (todas en false) — el simulador deja tocarlas para responder
// justamente la pregunta abierta de §9 ("¿qué pasaría si cambiáramos esta bandera?").
export interface TieBreakFlags {
  DISCOUNT_PERCENTAGE: boolean // PRICING_GIVE_THE_GREATER_DISCOUNT
  DISCOUNT_AMOUNT: boolean // ídem — mismo flag que descuento %, el legacy no lo separa
  FIXED_PRICE: boolean // PRICING_GIVE_THE_GREATER_FIXED_PRICE
  PRODUCT: boolean // PRICING_GIVE_THE_GREATER_BONUS_PRODUCT
  PRODUCT_SURCHARGE: boolean // PRICING_GIVE_THE_GREATER_SURCHARGE_PRODUCT
}

export const DEFAULT_TIE_BREAK_FLAGS: TieBreakFlags = {
  DISCOUNT_PERCENTAGE: false,
  DISCOUNT_AMOUNT: false,
  FIXED_PRICE: false,
  PRODUCT: false,
  PRODUCT_SURCHARGE: false,
}

// Un candidato dentro de una canasta (outcomeType) — ganador o descartado, con el motivo.
export interface BucketCandidate {
  ruleId: number
  ruleName: string
  value: number
  valueLabel: string // ej. "2%", "Bs 45.00", "Regalo: 1x Ketchup Kris 980g"
  won: boolean
  exclusiveOutcome: PriceRule["exclusiveOutcome"]
}

export interface BucketResult {
  outcomeType: OutcomeType
  candidates: BucketCandidate[]
  winner: BucketCandidate | null
  blockedByExclusivity: boolean // el ganador de OTRO tipo, con exclusiveOutcome=OUTCOME_TYPE, tapó esta canasta
  blockedByRuleName?: string
}

export interface LineSimulationResult {
  lineId: string
  productName: string
  productCode: string
  quantity: number
  unitPrice: number
  subtotal: number
  applicableRuleIds: number[] // pasaron matching general Y tienen al menos una fila específica que calza esta línea (o son Universal)
  buckets: BucketResult[] // una por outcomeType con al menos un candidato
  finalTotal: number
}

export interface OrderLevelSimulationResult {
  subtotal: number
  applicableRuleIds: number[]
  buckets: BucketResult[]
  finalTotal: number
}

export interface SimulationResult {
  ruleCountConsidered: number
  ruleCountApplicable: number
  notApplicableRuleIds: { ruleId: number; ruleName: string; reason: string }[]
  lines: LineSimulationResult[]
  orderLevel: OrderLevelSimulationResult | null // solo si hubo reglas con target === "SALE_ORDER" aplicables
  grandTotalBefore: number
  grandTotalAfter: number
}
