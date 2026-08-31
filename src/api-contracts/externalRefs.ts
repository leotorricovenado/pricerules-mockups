import type { ExternalRef } from "./types"

// Datos que este mockup simula localmente (data/catalogs.ts) pero que en CRM-DEAL NO son
// responsabilidad de Reglas de Precio — el servicio solo los referencia por id (CLAUDE.md §12,
// "El ID manda para calcular, el nombre es decoración"). Todos viven en el microservicio de
// Sales, incluido lo que acá llamamos "Catálogo" (producto/marca/categoría/familia/sub-familia/
// división) — no es un servicio aparte.
//
// Esta lista es deliberadamente liviana (sin forma de endpoint) porque Detalle y Listado solo
// MUESTRAN el code/name ya guardado en el documento de la regla — no llaman a Sales en vivo. La
// pantalla de creación/edición sí llama a Sales en vivo para poblar los combos: sus endpoints
// completos (método, params, response) están documentados aparte en salesLookups.contracts.ts.

export const EXTERNAL_REFS: ExternalRef[] = [
  {
    id: "distributor",
    service: "sales",
    label: "Distribuidora",
    mockSource: "DISTRIBUTORS",
    usage: "Criterios Generales → Distribuidora (multi-select por distributorIds: number[]).",
  },
  {
    id: "warehouse",
    service: "sales",
    label: "Almacén",
    mockSource: "WAREHOUSES",
    usage: "Criterios Generales → Almacenes (multi-select por warehouseIds: number[]).",
  },
  {
    id: "customer",
    service: "sales",
    label: "Cliente",
    mockSource: "CUSTOMERS",
    usage:
      "Criterios de la Regla → elemento Cliente. Sales es dueño de zona/canal/propietario del cliente. Único caso con evidencia real de red: el JSF viejo buscaba con AJAX a GET /rest/select2/customers?distributorId={id} — búsqueda por \"contiene\" (no prefijo) y con scope obligatorio por distribuidora ya elegida arriba (ESPECIFICACION-UI-CAPTURADA.md §2).",
  },
  {
    id: "owner",
    service: "sales",
    label: "Propietario",
    mockSource: "OWNERS",
    usage: "Criterios de la Regla → elemento Propietario (clasificación del cliente).",
  },
  {
    id: "sale-channel",
    service: "sales",
    label: "Canal de venta",
    mockSource: "SALE_CHANNELS",
    usage:
      "Criterios de la Regla → elemento Canal de venta. También el dropdown adicional obligatorio que aparece al elegir Ruta (§21 — se guarda junto a la fila, CriteriaRow.saleChannelId).",
  },
  {
    id: "sub-sale-channel",
    service: "sales",
    label: "Subcanal",
    mockSource: "SUB_SALE_CHANNELS",
    usage: "Criterios de la Regla → elemento Subcanal.",
  },
  {
    id: "route",
    service: "sales",
    label: "Ruta",
    mockSource: "ROUTES",
    usage: "Criterios de la Regla → elemento Ruta (requiere elegir también un Canal de venta, ver arriba).",
  },
  {
    id: "seller",
    service: "sales",
    label: "Vendedor",
    mockSource: "SELLERS",
    usage:
      "Criterios de la Regla → elemento Vendedor (empleado). Reemplaza al viejo filtro \"Tipo de Rol\" de Criterios Generales (§21) — antes filtraba por rol genérico, ahora selecciona vendedores concretos igual que Cliente/Propietario.",
  },
  {
    id: "division",
    service: "sales",
    label: "División",
    mockSource: "DIVISIONS",
    usage: "Criterios Específicos → elemento División.",
  },
  {
    id: "brand",
    service: "sales",
    label: "Marca",
    mockSource: "BRANDS",
    usage: "Criterios Específicos → elemento Marca.",
  },
  {
    id: "category",
    service: "sales",
    label: "Categoría",
    mockSource: "CATEGORIES",
    usage: "Criterios Específicos → elemento Categoría.",
  },
  {
    id: "family",
    service: "sales",
    label: "Familia",
    mockSource: "FAMILIES",
    usage: "Criterios Específicos → elemento Familia.",
  },
  {
    id: "sub-family",
    service: "sales",
    label: "Sub-Familia",
    mockSource: "SUB_FAMILIES",
    usage: "Criterios Específicos → elemento Sub-Familia.",
  },
  {
    id: "product",
    service: "sales",
    label: "Producto",
    mockSource: "PRODUCTS",
    usage: "Criterios Específicos → elemento Producto, y Resultado → Bonificación/Recargo/Producto opcional. Incluye unidad de medida y cadena de empaque (units[]).",
  },
]

export function findExternalRef(id: string): ExternalRef | undefined {
  return EXTERNAL_REFS.find((r) => r.id === id)
}
