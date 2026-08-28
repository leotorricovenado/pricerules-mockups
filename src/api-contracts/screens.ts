export interface ScreenContracts {
  title: string
  /** Endpoints con forma completa — de este servicio o de otro (ej. los lookups de Sales). */
  contractIds: string[]
  /** Solo para pantallas que NO llaman a otro servicio en vivo — Detalle y Listado únicamente
   *  muestran el code/name ya guardado en el documento de la regla. Ver externalRefs.ts. */
  externalRefIds: string[]
}

const DASHBOARD: ScreenContracts = {
  title: "Dashboard",
  contractIds: ["get-dashboard-summary", "get-dashboard-applications"],
  externalRefIds: [],
}

const LIST: ScreenContracts = {
  title: "Listado de Reglas de Precio",
  contractIds: [
    "list-price-rules",
    "approve-price-rule",
    "reject-price-rule",
    "enable-price-rule",
    "disable-price-rule",
    "duplicate-price-rule",
    "bulk-import-price-rules",
  ],
  externalRefIds: ["sale-channel"],
}

const DETAIL: ScreenContracts = {
  title: "Detalle de Regla de Precio",
  contractIds: [
    "get-price-rule",
    "approve-price-rule",
    "reject-price-rule",
    "enable-price-rule",
    "disable-price-rule",
    "duplicate-price-rule",
  ],
  externalRefIds: [
    "distributor",
    "warehouse",
    "role-type",
    "customer",
    "owner",
    "sale-channel",
    "sector",
    "route",
    "division",
    "brand",
    "category",
    "family",
    "sub-family",
    "product",
  ],
}

// Creación/edición SÍ llama a Sales en vivo para poblar los combos — a diferencia de Detalle y
// Listado, acá no alcanza con "es de Sales, no lo documento": hace falta saber a qué endpoint
// pegarle y qué responde, para mostrar las opciones y después mandar el create/update con ids.
const SALES_LOOKUP_CONTRACT_IDS = [
  "sales-lookup",
  "sales-search-warehouses",
  "sales-search-customers",
  "sales-search-products",
]

const FORM_CREATE: ScreenContracts = {
  title: "Nueva Regla de Precio",
  contractIds: ["create-price-rule", ...SALES_LOOKUP_CONTRACT_IDS],
  externalRefIds: [],
}

const FORM_EDIT: ScreenContracts = {
  title: "Editar Regla de Precio",
  contractIds: ["get-price-rule", "update-price-rule", ...SALES_LOOKUP_CONTRACT_IDS],
  externalRefIds: [],
}

// Coincide con las rutas declaradas en App.tsx.
export function resolveScreenContracts(pathname: string): ScreenContracts | undefined {
  if (pathname === "/dashboard") return DASHBOARD
  if (pathname === "/reglas-precio") return LIST
  if (pathname === "/reglas-precio/nueva") return FORM_CREATE
  if (/^\/reglas-precio\/[^/]+\/editar$/.test(pathname)) return FORM_EDIT
  if (/^\/reglas-precio\/[^/]+$/.test(pathname)) return DETAIL
  return undefined
}
