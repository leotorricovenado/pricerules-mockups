import type { ApiContract } from "./types"

// A diferencia de priceRules.contracts.ts, todo acá es "planned": el mockup importa estos
// catálogos como arrays estáticos de data/catalogs.ts directo en el componente, sin ninguna
// función que haga de stand-in de un fetch (a diferencia de usePriceRules(), que sí simula cada
// operación). No es que falte definir el contrato — es que no hay ni un lugar en el código donde
// "llamarlo" tendría sentido hoy. Se documenta igual porque la pantalla de creación/edición SÍ
// necesita pegarle a Sales en vivo en la versión real: precarga los catálogos chicos (combos) y
// busca los grandes a medida que se escribe (typeahead).
//
// Todos devuelven el shape mínimo {id, code, name} — el mismo que espera CatalogCombobox — porque
// es lo único que criteriaRows/specificRows necesitan guardar como referencia (CLAUDE.md §12: "el
// ID manda para calcular, el nombre es decoración"). Nada de zona/canal/propietario del cliente
// acá: eso lo pide calculate-price-rule cuando arma el pedido completo, no este picker.
//
// Envelope { data, code, message } por consistencia con priceRules.contracts.ts (convención real
// de la mayoría de los módulos de Sales, CLAUDE.md §19) — son endpoints propuestos, así que se
// documentan ya con la forma que Sales usaría en la práctica, no una forma inventada aparte.
function envelope(data: unknown, message: string) {
  return { data, code: 200, message }
}

const DISTRIBUTORS_EXAMPLE = [
  { id: 1, code: "DISCRUZ", name: "Distribuidora Santa Cruz" },
  { id: 2, code: "DISPAZ", name: "Distribuidora La Paz" },
  { id: 3, code: "COCHABAMBA", name: "Distribuidora Cochabamba" },
]

const WAREHOUSES_EXAMPLE = [
  { id: 101, code: "ALM-SC-01", name: "Almacén Central Santa Cruz" },
  { id: 102, code: "CAM-SC-04", name: "Camión Reparto SC-04" },
]

const CUSTOMERS_EXAMPLE = [
  { id: 134125, code: "134125", name: "Comercial Rojas SRL" },
]

const PRODUCTS_EXAMPLE = [
  {
    id: 5001,
    code: "P-5001",
    name: "Ketchup Real 500ml",
    unit: "BOTELLA",
    units: ["DISPLAY", "CAJA"],
  },
]

export const SALES_CONTRACTS: ApiContract[] = [
  {
    id: "sales-lookup",
    service: "sales",
    method: "GET",
    path: "/sales/lookups/{type}",
    summary: "Catálogos chicos — precarga completa para combos",
    description:
      "Cubre los 11 catálogos que el form de Reglas de Precio carga enteros porque son chicos y estables: Distribuidora, Tipo de Rol, Canal de venta, Subcanal, Ruta, Propietario, División, Marca, Categoría, Familia y Sub-Familia. Mismo shape de respuesta para los 11 — solo cambia qué trae {type}. Alternativa considerada: un recurso REST propio por catálogo (/sales/distributors, /sales/brands, …) — más \"puro\" pero son 11 endpoints casi idénticos para documentar y mantener; se prefiere este único endpoint parametrizado mientras sigan siendo solo lectura para este consumidor.",
    status: "planned",
    pathParams: [
      {
        name: "type",
        type: "distributors | role-types | sale-channels | sub-sale-channels | routes | owners | divisions | brands | categories | families | sub-families",
        required: true,
        description: "Qué catálogo pedir.",
      },
    ],
    responseBody: {
      description: "Ejemplo con type=distributors — el resto de los 11 devuelve la misma forma.",
      example: envelope(DISTRIBUTORS_EXAMPLE, "Distribuidoras obtenidas"),
    },
  },
  {
    id: "sales-search-warehouses",
    service: "sales",
    method: "GET",
    path: "/sales/warehouses",
    summary: "Búsqueda de almacenes (typeahead)",
    description:
      "Almacenes reales son ~290, camiones de reparto incluidos (CLAUDE.md §2) — no entran precargados como los catálogos chicos de arriba. Alimenta Criterios Generales → Almacenes.",
    status: "planned",
    queryParams: [
      { name: "search", type: "string", description: "Nombre o código, búsqueda por \"contiene\"." },
      { name: "limit", type: "number", description: "Tope de resultados (típico en un typeahead: 20-50)." },
    ],
    responseBody: { example: envelope(WAREHOUSES_EXAMPLE, "Almacenes obtenidos") },
    notes: [
      "En el mockup hoy Almacenes NO está scoped por Distribuidora — a diferencia de Cliente, que sí lo está y sí tiene evidencia real de esto. Un almacén lógicamente pertenece a una distribuidora; falta confirmar con Sales si el endpoint real debería filtrar por distributorId también.",
    ],
  },
  {
    id: "sales-search-customers",
    service: "sales",
    method: "GET",
    path: "/sales/customers",
    summary: "Búsqueda de clientes (typeahead, scoped por distribuidora)",
    description:
      "Único endpoint de este grupo con evidencia real de red — el JSF viejo pegaba a GET /rest/select2/customers?distributorId={id} (ESPECIFICACION-UI-CAPTURADA.md §2). Alimenta Criterios de la Regla → elemento Cliente, deshabilitado hasta elegir al menos una Distribuidora arriba (CriteriaRowsPanel.tsx, hasDistributor).",
    status: "planned",
    queryParams: [
      {
        name: "search",
        type: "string",
        description: "Búsqueda por \"contiene\", no por prefijo — confirmado: buscar \"12\" trae \"134125\".",
      },
      {
        name: "distributorId",
        type: "number",
        description:
          "El legacy scopea por un único id. El form de este mockup permite elegir VARIAS distribuidoras (distributorIds: number[]) — falta decidir si esto pasa a ser distributorId repetido, distributorIds separado por comas, o se resuelve mandando una llamada por distribuidora seleccionada.",
      },
    ],
    responseBody: { example: envelope(CUSTOMERS_EXAMPLE, "Clientes obtenidos") },
  },
  {
    id: "sales-search-products",
    service: "sales",
    method: "GET",
    path: "/sales/products",
    summary: "Búsqueda de productos (typeahead)",
    description:
      "Alimenta Criterios Específicos → elemento Producto y los pickers de Bonificación/Recargo/Producto opcional en Configuración del Resultado Esperado. unit es fija (Criterios Específicos la muestra de solo lectura); units[] es la cadena de empaque completa — Bonificación/Recargo sí deja elegir en cuál de esas unidades se entrega/recarga.",
    status: "planned",
    queryParams: [{ name: "search", type: "string", description: "Nombre o código, búsqueda por \"contiene\"." }],
    responseBody: { example: envelope(PRODUCTS_EXAMPLE, "Productos obtenidos") },
  },
  {
    id: "sales-owner-accumulated-purchases",
    service: "sales",
    method: "GET",
    path: "/sales/owners/{ownerId}/accumulated-purchases",
    summary: "Total acumulado de compras de un Dueño (propuesta — outcomeMode ACCUMULATED)",
    description:
      "Alimenta la regla 'Acumulado' propuesta en la reunión del 2026-08-27 (CLAUDE.md §23.1). Sales es quien entrega este total — Reglas de Precio no mantiene su propio contador de compras históricas, ese dato vive donde vive el historial de pedidos. Borrador, no confirmado: falta cerrar con el equipo de Sales si esto se consulta en vivo en cada calculate-price (agrega latencia/dependencia a algo que corre miles de veces/día) o si Reglas de Precio lo consume ya precalculado.",
    status: "planned",
    pathParams: [{ name: "ownerId", type: "number", required: true, description: "Id del Dueño (Propietario)." }],
    queryParams: [
      {
        name: "scope",
        type: "TOTAL | MARCA | FAMILIA | CATEGORIA | PRODUCTO",
        description: "Sobre qué dimensión sumar — coincide con PriceRule.accumulationScope.",
      },
      {
        name: "scopeRefCode",
        type: "string",
        description: "Código de la marca/familia/categoría/producto — vacío si scope=TOTAL.",
      },
      { name: "fromDate", type: "string (yyyy-mm-dd)", description: "Ventana de tiempo — desde." },
      { name: "toDate", type: "string (yyyy-mm-dd)", description: "Ventana de tiempo — hasta." },
    ],
    responseBody: {
      example: envelope(
        { ownerId: 2, ownerName: "Franquicia Sur", total: 27350.5, fromDate: "2026-08-01", toDate: "2026-08-31" },
        "Acumulado obtenido"
      ),
    },
    notes: [
      "Sin equivalente legacy — es un endpoint enteramente nuevo, motivado por una capacidad que el motor de reglas nunca tuvo (CLAUDE.md §23.1: el motor siempre fue stateless por pedido).",
      "Rango de fechas fijo (fromDate/toDate), no una ventana rolling relativa a 'hoy' — decisión tomada en el mockup tras feedback directo de Comercial (CLAUDE.md §23.1).",
    ],
  },
]
