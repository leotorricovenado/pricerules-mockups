import type { ApiContract } from "./types"
import { PRICE_RULE_CONTRACTS } from "./priceRules.contracts"
import { SALES_CONTRACTS } from "./salesLookups.contracts"

// Todo lo consultable desde el panel, sin importar de qué servicio es — screens.ts arma la lista
// de ids relevante por pantalla, esto solo resuelve id -> contrato.
const ALL_CONTRACTS: ApiContract[] = [...PRICE_RULE_CONTRACTS, ...SALES_CONTRACTS]

export function findContract(id: string): ApiContract | undefined {
  return ALL_CONTRACTS.find((c) => c.id === id)
}
