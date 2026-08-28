import type { ApiContract } from "./types"

// Ejemplos reales tomados de data/mock-price-rules.ts (regla #4821 y #4823) — no son datos
// inventados para la documentación, son los mismos que se ven navegando el mockup.
//
// Envelope de respuesta: { data, code, message } — convención real de la mayoría de los módulos
// de Sales (sales-documentation.docx, ver CLAUDE.md §19). El módulo de Órdenes de ESE MISMO
// documento usa { data, success, message } en cambio — inconsistencia real entre módulos de
// Sales, no un error de este archivo. calculate-price-legacy documenta esa forma tal cual está,
// porque es la que existe hoy; el resto de los endpoints de Reglas de Precio (todos nuevos, sin
// equivalente legacy) adopta { data, code, message } por ser la más frecuente.
function envelope(data: unknown, message: string) {
  return { data, code: 200, message }
}

// exclusiveOutcome: "NONE" con outcomeType: "DISCOUNT_PERCENTAGE" — a partir de la regla de negocio
// de §22 esta combinación ya no sería válida para una regla NUEVA (solo Bonificación de Productos
// puede ser Acumulable). Se deja tal cual porque es un ejemplo real existente
// (data/mock-price-rules.ts) previo a esa regla, no un dato inventado — mismo criterio que con
// DISCOUNT_AMOUNT/FIXED_PRICE en reglas históricas (§21).
const RULE_4821_FULL = {
  id: 4821,
  company: "VEMASSA",
  name: "Descuento volumen Kris — Canal Moderno",
  description: "Escala de descuento por monto de compra de línea Kris en canal moderno.",
  fromDate: "2026-06-01",
  thruDate: "2026-12-31",
  outcomeMode: "SCALE",
  applyOnlyOnce: false,
  status: "ENABLE",
  approvalStatus: "APPROVED",
  exclusiveOutcome: "NONE",
  distributorIds: [1, 3],
  warehouseIds: [],
  paymentCondition: "TODOS",
  criteriaRows: [{ id: "c1", type: "CANAL_VENTA", code: "CAN-MOD", name: "Canal Moderno" }],
  ruleType: "RESTRICTED",
  specificRows: [{ id: "s1", type: "MARCA", code: "MARCA-04", name: "Kris" }],
  target: "PRODUCT",
  outcomeType: "DISCOUNT_PERCENTAGE",
  scaleType: "AMOUNT",
  scales: [
    { id: "sc1", from: 0, to: 999.99, value: 0 },
    { id: "sc2", from: 1000, to: 2999.99, value: 5 },
    { id: "sc3", from: 3000, to: null, value: 8 },
  ],
  createdBy: "cecilia.viera",
  createdAt: "2026-05-28T10:15:00",
  updatedAt: "2026-08-20T14:30:00",
}

// PriceRuleSummary — únicamente lo que la fila de la tabla y el menú de acciones necesitan.
// Sin company: se filtra por query param server-side, pero no se renderiza como columna, así que
// no hace falta que vuelva en cada fila. Comparar con el listado real de Grupo Venado
// (data/result-100,json): expone id/name/description/fechas/status/ruleType/outcomeType pero
// NUNCA outcomeMode — por eso todas las reglas importadas (data/venado-price-rules.ts) quedaron
// con outcomeMode="SINGLE" a falta de ese dato. Acá sí se puede incluir sin costo porque es un
// campo más del mismo documento Mongo, no una tabla aparte que haya que joinear.
const RULE_4821_SUMMARY = {
  id: 4821,
  name: "Descuento volumen Kris — Canal Moderno",
  description: "Escala de descuento por monto de compra de línea Kris en canal moderno.",
  fromDate: "2026-06-01",
  thruDate: "2026-12-31",
  outcomeMode: "SCALE",
  outcomeType: "DISCOUNT_PERCENTAGE",
  status: "ENABLE",
  approvalStatus: "APPROVED",
  createdAt: "2026-05-28T10:15:00",
}

// outcomeMode SCALE (no SINGLE) porque DISCOUNT_PERCENTAGE con SINGLE ya no es una combinación
// válida para reglas nuevas (§22) — SINGLE solo admite PRODUCT o PRODUCT_SURCHARGE.
const RULE_4823_CREATE_REQUEST = {
  company: "IVSA",
  name: "Dscto. 6% Ketchup Real — Cliente Comercial Rojas",
  description: "Descuento porcentual negociado para cliente específico.",
  fromDate: "2026-08-25",
  thruDate: "2027-02-28",
  outcomeMode: "SCALE",
  applyOnlyOnce: false,
  status: "DISABLED",
  approvalStatus: "WAITING_COMMERCIAL_APPROVAL",
  exclusiveOutcome: "OUTCOME_TYPE",
  distributorIds: [1],
  warehouseIds: [],
  paymentCondition: "CASH",
  criteriaRows: [{ id: "c1", type: "CLIENTE", code: "134125", name: "Comercial Rojas SRL" }],
  ruleType: "RESTRICTED",
  specificRows: [{ id: "s1", type: "PRODUCTO", code: "P-5001", name: "Ketchup Real 500ml" }],
  target: "PRODUCT",
  outcomeType: "DISCOUNT_PERCENTAGE",
  scaleType: "AMOUNT",
  scales: [{ id: "sc1", from: 0, to: null, value: 6 }],
}

const RULE_4823_CREATED_RESPONSE = {
  ...RULE_4823_CREATE_REQUEST,
  id: 4823,
  createdBy: "sergio.rosso",
  createdAt: "2026-08-24T16:45:00",
  updatedAt: "2026-08-24T16:45:00",
}

export const PRICE_RULE_CONTRACTS: ApiContract[] = [
  {
    id: "list-price-rules",
    service: "price-rules",
    method: "GET",
    path: "/price-rules",
    summary: "Listado paginado con filtros",
    description:
      "Alimenta la tabla de PriceRuleListPage. Devuelve una versión resumida de cada regla (sin criteriaRows/specificRows/scales) — la fila de la tabla no necesita el documento completo.",
    status: "implemented",
    queryParams: [
      { name: "search", type: "string", description: "Nombre o código — filtro de texto libre." },
      { name: "company", type: "VEMASSA | IVSA | FACRULESA", description: "Filtro Empresa." },
      {
        name: "approvalStatus",
        type: "APPROVED | WAITING_COMMERCIAL_APPROVAL | WAITING_MANAGEMENT_APPROVAL | REJECTED",
        description: "Filtro Aprobación.",
      },
      { name: "status", type: "ENABLE | DISABLED", description: "Filtro Estado." },
      {
        name: "ruleType",
        type: "GENERAL | RESTRICTED | RESTRICTED_QUANTITY",
        description: "Filtro Tipo de Resolución.",
      },
      {
        name: "createdBy",
        type: "string",
        description:
          "Filtro Creador de Regla — username de quien creó la regla. Reemplaza al filtro Canal (quitado en la reunión del 2026-08-27, CLAUDE.md §21).",
      },
      { name: "fromDateFrom", type: "string (yyyy-mm-dd)", description: "Filtro Fecha Inicio — desde." },
      { name: "fromDateTo", type: "string (yyyy-mm-dd)", description: "Filtro Fecha Inicio — hasta." },
      { name: "thruDateFrom", type: "string (yyyy-mm-dd)", description: "Filtro Fecha Fin — desde." },
      { name: "thruDateTo", type: "string (yyyy-mm-dd)", description: "Filtro Fecha Fin — hasta." },
      { name: "page", type: "number", description: "Página a consultar. Valor por defecto: 1." },
      { name: "limit", type: "10 | 25 | 50 | 100", description: "Registros por página." },
    ],
    responseBody: {
      description:
        "Paginación anidada bajo pagination — mismo shape que usa Sales en sus listados (ej. R1.- Lista de Rutas en sales-documentation.docx), en vez del page/pageSize/total sueltos de una versión anterior de este documento.",
      example: envelope(
        {
          items: [RULE_4821_SUMMARY],
          pagination: { page: 1, limit: 10, totalItems: 107, totalPages: 11 },
        },
        "Reglas obtenidas"
      ),
    },
    notes: [
      "El contador del header (\"107 reglas · 7 activas\") hoy sale de rules.length en memoria — en real necesitaría un segundo campo agregado (activeCount) o una llamada aparte, porque con paginación ya no se puede contar sobre la página actual.",
      "¿Por qué GET y no POST /price-rules/search? Los 12 params son todos escalares (strings/enums/fechas/números), sin arrays ni objetos anidados — entra cómodo en querystring y queda cacheable/bookmarkable. Si algún filtro pasa a multi-select (ej. varios canales a la vez, como ya es multi-select en el form), conviene revisar el cambio a POST con body — recién ahí un GET se vuelve incómodo.",
      "Comparado con el endpoint real de Grupo Venado (data/result-100,json): ese devuelve además approved/valid/hasDiscount/bonification/allowToSelectRuleApplication/importId/canDownloadExcel/canChangeStatusByImport — todos derivables en el front a partir de approvalStatus + outcomeType, o sin uso en esta pantalla. Se dejan afuera del contrato nuevo a propósito.",
    ],
  },
  {
    id: "get-price-rule",
    service: "price-rules",
    method: "GET",
    path: "/price-rules/{id}",
    summary: "Detalle completo de una regla",
    description:
      "Alimenta PriceRuleDetailPage y precarga PriceRuleFormPage en modo edición. Documento completo — Mongo lo guarda como una sola unidad, sin joins (CLAUDE.md §12).",
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    responseBody: { example: envelope(RULE_4821_FULL, "Regla obtenida") },
  },
  {
    id: "create-price-rule",
    service: "price-rules",
    method: "POST",
    path: "/price-rules",
    summary: "Crear regla",
    description:
      "PriceRuleFormPage en modo creación. Nace en WAITING_COMMERCIAL_APPROVAL / DISABLED sin importar lo que mande el form — el motor no la aplica hasta que se aprueba.",
    status: "implemented",
    requestBody: {
      description: "Mismo shape que el documento, sin id/createdBy/createdAt/updatedAt.",
      example: RULE_4823_CREATE_REQUEST,
    },
    responseBody: { example: envelope(RULE_4823_CREATED_RESPONSE, "Regla creada") },
    notes: [
      "createdBy sale del usuario autenticado en el gateway, no del body — el form no lo manda.",
      'outcomeType en creación/edición queda acotado por outcomeMode (CLAUDE.md §22): SINGLE admite PRODUCT o PRODUCT_SURCHARGE; FREQUENCY admite solo PRODUCT; SCALE admite PRODUCT o DISCOUNT_PERCENTAGE; ACCUMULATED (§23.1, propuesta) admite PRODUCT o DISCOUNT_PERCENTAGE — sin confirmar explícitamente, asumido igual que SCALE. DISCOUNT_AMOUNT y FIXED_PRICE quedan fuera de cualquier modo (§21). Reglas ya existentes con cualquiera de estos tipos/combinaciones se siguen sirviendo y mostrando sin cambios; el backend debería rechazar (400) un create/update que mande una combinación outcomeMode/outcomeType fuera de esa matriz.',
      'outcomeMode admite el nuevo valor ACCUMULATED (§23.1, propuesta sin precedente legacy): requiere accumulationScope (TOTAL | MARCA | FAMILIA | CATEGORIA | PRODUCTO), accumulationScopeRef si scope !== TOTAL, accumulationFromDate/accumulationToDate (rango de fechas fijo, no una ventana rolling) y accumulationThreshold. El motor evaluaría el umbral contra un total histórico del Dueño que entrega Sales (ver sales-owner-accumulated-purchases en salesLookups.contracts.ts) en vez del pedido actual — mecanismo de entrega (vivo vs. precalculado) todavía sin cerrar con el equipo de Sales.',
      'exclusiveOutcome en creación/edición y en approve-price-rule queda forzado a OUTCOME_TYPE salvo que outcomeType === PRODUCT (§22, regla de negocio: "solo las reglas de bonificación pueden ser acumulables"). El backend debería rechazar (400) un create/update/approve que mande exclusiveOutcome=NONE con un outcomeType distinto de PRODUCT.',
      'ruleType admite el nuevo valor RESTRICTED_QUANTITY (§21): igual que RESTRICTED, pero cada specificRows de type PRODUCTO debe traer requiredQty (number > 0) — el motor exige esa cantidad mínima de cada producto, no solo su presencia.',
      'Una fila de criteriaRows con type RUTA ahora es obligatoria junto con saleChannelId/saleChannelCode/saleChannelName (§21) — elegir Ruta sin Canal de Venta debería rechazarse.',
      'Verificado contra el código real (controller/PriceRuleController.java, @Path("/mobile/price")): esta ruta NO existe hoy. El controller solo expone test/calculate/activePriceRule/disablePriceRule/activePriceRules/priceRuleStatus/{id} — nada de crear ni editar reglas. La creación real ocurre en pricerule_create.jsf (ESPECIFICACION-UI-CAPTURADA.md §2): un formulario JSF con postback de ViewState, no un request JSON contra una API. Este contrato es 100% propuesta nueva para CRM-DEAL — no hay nada que verificar en el legacy porque el legacy nunca tuvo esto como endpoint.',
    ],
  },
  {
    id: "update-price-rule",
    service: "price-rules",
    method: "PUT",
    path: "/price-rules/{id}",
    summary: "Editar regla",
    description:
      "PriceRuleFormPage en modo edición. Solo permitido si approvalStatus !== APPROVED (regla de UI en PriceRuleFormPage.tsx) — una regla aprobada se duplica, no se edita en el lugar.",
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    requestBody: { example: RULE_4823_CREATE_REQUEST },
    responseBody: { example: envelope(RULE_4823_CREATED_RESPONSE, "Regla actualizada") },
    notes: [
      'Mismo caso que create-price-rule: no existe en PriceRuleController.java. La edición real es pricerule_edit.jsf, todavía sin capturar (ESPECIFICACION-UI-CAPTURADA.md §3, pendiente "confirmar si difiere de creación"). Propuesta nueva, sin equivalente legacy que confirmar.',
    ],
  },
  {
    id: "approve-price-rule",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/{id}/approve",
    summary: "Aprobar regla",
    description:
      'Modal "Aprobar Regla de Precios" (ApprovalDialog). Aprobar también fija exclusiveOutcome y activa la regla en el mismo paso — no son dos acciones separadas.',
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    requestBody: {
      description:
        "El radio Acumulable/No Acumulable del modal — el radio Acumulable solo se ofrece si rule.outcomeType === PRODUCT (§22); en cualquier otro caso el modal ni lo muestra y manda OUTCOME_TYPE.",
      example: { exclusiveOutcome: "NONE" },
    },
    responseBody: {
      example: envelope(
        { ...RULE_4821_FULL, approvalStatus: "APPROVED", status: "ENABLE" },
        "Regla aprobada y activada"
      ),
    },
    notes: [
      'exclusiveOutcome=NONE (Acumulable) solo es válido junto con outcomeType=PRODUCT (§22) — ver nota de validación en create-price-rule.',
    ],
  },
  {
    id: "reject-price-rule",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/{id}/reject",
    summary: "Rechazar regla",
    description:
      'Botón "Rechazar" del modal de aprobación normal (rule.approvalStatus === WAITING_COMMERCIAL_APPROVAL). Mismo endpoint reutilizado por el botón "Rechazar (ya aprobada)" del listado/detalle (§21, RejectApprovedDialog) — el estado previo no importa para el servicio, solo cambia qué permiso lo habilita del lado del cliente (price_rules.approve vs price_rules.reject_approved, exclusivo de Admin). Sin body.',
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    responseBody: {
      example: envelope(
        { ...RULE_4821_FULL, approvalStatus: "REJECTED", status: "DISABLED" },
        "Regla rechazada"
      ),
    },
    notes: [
      "Rechazar una regla APPROVED (vía el flujo de Admin, §21) es una corrección de errores de typeo, no el flujo normal de aprobación — se acordó en la reunión del 2026-08-27 que solo Admin puede hacerlo, con modal de confirmación separado por tratarse de una regla que podría estar activa en producción.",
    ],
  },
  {
    id: "enable-price-rule",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/{id}/enable",
    summary: "Activar regla",
    description:
      'Toggle "Activo" en el listado y botón "Activar" en el detalle. Solo disponible si approvalStatus === APPROVED.',
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    responseBody: { example: envelope({ ...RULE_4821_FULL, status: "ENABLE" }, "Regla activada") },
    notes: [
      'Tiene equivalente real: PUT /mobile/price/activePriceRule, body { "priceRuleId": 4821 } (no path param), responde un string plano de confirmación en vez del documento actualizado (model/dto/PriceRuleDto.java + controller/PriceRuleController.java:activePriceRule). Ahí es literalmente "meter la regla al caché en memoria" (parche del bug de fecha congelada, CLAUDE.md §6) — en la arquitectura nueva no hay caché que mutar, así que el propuesto de arriba se queda con la forma RESTful (path param, devuelve el recurso) en vez de copiar la forma legacy.',
    ],
  },
  {
    id: "disable-price-rule",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/{id}/disable",
    summary: "Desactivar regla",
    description: "Mismo control que enable, sentido contrario.",
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    responseBody: { example: envelope({ ...RULE_4821_FULL, status: "DISABLED" }, "Regla desactivada") },
    notes: [
      'Equivalente real: PUT /mobile/price/disablePriceRule, mismo body { "priceRuleId" } y misma respuesta como string plano que enable-price-rule — ver nota ahí.',
    ],
  },
  {
    id: "duplicate-price-rule",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/{id}/duplicate",
    summary: "Duplicar regla",
    description:
      'Acción "Duplicar" del listado y del detalle. Sin body — el nombre "(copia)" y el reseteo a pendiente de aprobación los decide el servicio, no el cliente.',
    status: "implemented",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla original." }],
    responseBody: {
      example: envelope(
        {
          ...RULE_4821_FULL,
          id: 4827,
          name: "Descuento volumen Kris — Canal Moderno (copia)",
          status: "DISABLED",
          approvalStatus: "WAITING_COMMERCIAL_APPROVAL",
          createdBy: "fernando.unzueta",
          createdAt: "2026-08-26T09:00:00",
          updatedAt: "2026-08-26T09:00:00",
        },
        "Regla duplicada"
      ),
    },
  },
  {
    id: "bulk-import-price-rules",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/import",
    summary: "Carga masiva",
    description:
      "BulkUploadDialog. El formato real de la planilla (price_rule_import) sigue sin definir con Comercial (CLAUDE.md §14) — este es un borrador, no un contrato confirmado.",
    status: "planned",
    requestBody: {
      description: "multipart/form-data — un único campo file (.xlsx o .csv, máx. 10 MB).",
      example: "file: reglas_agosto.xlsx",
    },
    responseBody: {
      description: "Borrador — resultado por fila para poder mostrar qué filas fallaron.",
      example: envelope(
        {
          importId: "imp-2026-08-26-001",
          totalRows: 42,
          created: 39,
          errors: [{ row: 12, message: "Producto P-9999 no existe en Catálogo" }],
        },
        "Carga procesada con errores"
      ),
    },
    notes: ["No implementar contra este borrador sin confirmar el formato de columnas con Comercial."],
  },
  {
    id: "get-price-rule-applied",
    service: "price-rules",
    method: "GET",
    path: "/price-rules/{id}/applied",
    summary: "Historial de aplicación",
    description:
      "Propuesto en CLAUDE.md §12 (colección price_rule_applied) para auditoría — todavía no hay pantalla en este mockup que lo muestre.",
    status: "planned",
    pathParams: [{ name: "id", type: "number", required: true, description: "Id de la regla." }],
    responseBody: {
      example: envelope(
        [
          {
            saleOrderId: 88123,
            customerId: 200001,
            appliedAt: "2026-08-20T15:32:00",
            outcomeType: "DISCOUNT_PERCENTAGE",
            valueApplied: 8,
          },
        ],
        "Historial obtenido"
      ),
    },
  },
  {
    id: "calculate-price-legacy",
    service: "price-rules",
    method: "POST",
    path: "/mobile/price/calculate",
    summary: "Cálculo de precio — HOY (real, en producción)",
    description:
      'El único endpoint que importa en producción — lo llama Sales miles de veces/día al armar un pedido. Implementado en PriceRuleController.calculate() usando SaleOrderMobilePriceRuleDto. Confirmado también del lado de Sales: sales-documentation.docx lo documenta como "O3.- Bonificaciones y descuentos", todavía marcado ENDPOINT: POR DEFINIR en ese mismo documento — es decir, Sales ya lo consume en producción pero nunca terminó de formalizarlo como contrato versionado. Body y response de acá son copia fiel de lo que ese documento llama "BODY ACTUAL DEL SERVICIO" / "RESPUESTA ACTUAL", no una reconstrucción.',
    status: "implemented",
    requestBody: {
      description: "Coincide campo a campo con SaleOrderMobilePriceRuleDto (controller/PriceRuleController.java).",
      example: {
        employeeId: "5638",
        customerId: "100077",
        paymentMode: 0,
        saleDetailList: [
          {
            minQuantity: 2,
            maxQuantity: 0,
            oldMinQuantity: 2,
            oldMaxQuantity: 0,
            totalQuantity: 2,
            equivalenceId: "4712",
            price: "16.1",
            originalPrice: "16.10",
            totalNet: "32.20",
            totalGross: "32.20",
            productId: "1428",
            stock: 148,
          },
        ],
      },
    },
    responseBody: {
      description:
        "Se muestran 2 de las 3 líneas del ejemplo real (una por producto) porque revelan un hallazgo: company/economicActivity vienen distintos en cada línea de UN MISMO pedido — ver notas.",
      example: {
        data: [
          {
            minQuantity: 2,
            maxQuantity: 0,
            totalQuantity: 2,
            equivalenceId: 4712,
            equivalence: 48,
            price: "16.10",
            originalPrice: "16.10",
            totalNet: "30.27",
            totalGross: "32.20",
            discountAmount: "1.93",
            discountInPercentage: "6.00",
            productId: 1428,
            company: {
              id: 1,
              nit: "1020539025",
              name: "INDUSTRIAS VENADO S.A.",
              address: "Teniente Oquendo Nº 103",
              phone: "2280600",
            },
            economicActivity: {
              id: 5,
              code: "GV10",
              name: "50408-VENTA AL POR MAYOR DE OTROS PRODUCTOS",
              invoiceItemQuantity: 25,
            },
            rulesApplied: [232769],
            rulesAppliedDescription: "Reglas Aplicadas: PRICING AGENCIAS NAL. Gestión 2026 - VENADO",
            productBonusGroup: 1,
            bonusRuleId: 0,
            ice: "0",
            iceUnitary: "0",
            calculateICE: false,
            name: "ATUN EN AGUA Y SAL EL PESCADOR",
            productCode: "400621",
            unitMeasureMinLabel: "LATA",
            unitMeasureMaxLabel: "CAJA",
            stock: 148,
            bonus: false,
            additional: false,
          },
          {
            minQuantity: 1,
            maxQuantity: 0,
            totalQuantity: 1,
            equivalenceId: 5123,
            equivalence: 6,
            price: "25.00",
            originalPrice: "25.00",
            totalNet: "23.50",
            totalGross: "25.00",
            discountAmount: "1.50",
            discountInPercentage: "6.00",
            productId: 1557,
            company: {
              id: 2,
              nit: "403420021",
              name: "VEMASSA ALIMENTOS Y BEBIDAS S.A.",
              address: "Viacha Esq. Calle 12 de Marzo, Nº 1944",
              phone: "",
            },
            economicActivity: {
              id: 14,
              code: "VE10",
              name: "463072 - COMERCIALIZACIÓN DE OTRAS BEBIDAS NO ALCOHÓLICAS EN ENVASES HERMÉTICAMENTE CERRADOS - COMERCIO MAYORISTA",
              invoiceItemQuantity: 25,
            },
            rulesApplied: [232769],
            rulesAppliedDescription: "Reglas Aplicadas: PRICING AGENCIAS NAL. Gestión 2026 - VENADO",
            productBonusGroup: 3,
            bonusRuleId: 0,
            ice: "0",
            iceUnitary: "0",
            calculateICE: false,
            name: "BEBIDA DE LA GRANJA NARANJA 3000 ML",
            productCode: "600206",
            unitMeasureMinLabel: "BOTELLA",
            unitMeasureMaxLabel: "PAQUETE",
            stock: 42,
            bonus: false,
            additional: false,
          },
        ],
        success: true,
        message: "Regla de precios aplicada",
      },
    },
    notes: [
      "employeeId/customerId viajan como string en el ejemplo real de Sales aunque el DTO (SaleOrderMobilePriceRuleDto) los trata como numéricos — inconsistencia a confirmar, no una decisión deliberada de este documento.",
      "El envelope de esta respuesta es { data, success, message } — DISTINTO del resto de los endpoints de este documento, que usan { data, code, message }. No es un error acá: es una inconsistencia real entre módulos de Sales (su propio módulo de Órdenes ya la tiene). Ver CLAUDE.md §19.",
      "rulesApplied es un array — puede haber más de una regla aplicada por línea (acumulables), aunque en este ejemplo real solo hay una.",
      "Evidencia dura para CLAUDE.md §11/§14 (company_id): en el MISMO pedido, la línea del producto 1428 factura por company.id=1 (INDUSTRIAS VENADO) y la del producto 1557 por company.id=2 (VEMASSA) — el motor no está particionando por empresa a nivel de pedido; coincide con \"company_id nunca se filtra\" (§11).",
    ],
  },
  {
    id: "calculate-price",
    service: "price-rules",
    method: "POST",
    path: "/price-rules/calculate",
    summary: "Cálculo de precio — PROPUESTO para CRM-DEAL",
    description:
      'Mismo propósito que calculate-price-legacy, rediseñado para que Reglas de Precio no dependa de la base de datos de Sales en tiempo de cálculo (CLAUDE.md §12: "sin dependencias en tiempo de cálculo"). El body deja de mandar solo ids (employeeId/customerId) y pasa a mandar el pedido ya resuelto (cliente con zona/canal/propietario, producto con su clasificación) — ese enriquecimiento pasa a ser responsabilidad de Sales, no de este servicio.',
    status: "planned",
    requestBody: {
      description:
        "Estructura self-contained de CLAUDE.md §12, en camelCase (la convención de Sales adoptada en CLAUDE.md §19 — el diagrama original de §12 usa nombres en español solo a modo ilustrativo).",
      example: {
        warehouse: { id: 101, name: "Almacén Central Santa Cruz" },
        paymentCondition: "CASH",
        customer: {
          id: 200001,
          name: "Hipermaxi S.A.",
          roles: ["SELLER"],
          locations: [{ zoneId: 3, subSaleChannelId: 1, saleChannelId: 1 }],
          classifications: { ownerId: 1 },
        },
        lines: [
          {
            product: { id: 5004, code: "P-5004", name: "Kris 500ml", unitMeasure: "UN" },
            quantity: 120,
            unitPrice: 12.5,
            total: 1500,
            features: { subFamilyId: 41, familyId: 4, categoryId: 3, brandId: 4, sectionId: null },
          },
        ],
      },
    },
    responseBody: {
      description:
        "Deliberadamente NO se rediseña campo a campo acá — CLAUDE.md §13 (Fase 4) marca la forma exacta de la respuesta como pendiente de cerrar recién cuando se porte la aritmética del motor. Referencia obligatoria para esa fase: la respuesta real de calculate-price-legacy (arriba), que ya prueba qué campos consume Sales hoy — ice/iceUnitary, company/economicActivity para facturar, rulesApplied/rulesAppliedDescription, productBonusGroup/bonusRuleId para agrupar bonificaciones. Ninguno de esos puede desaparecer del contrato nuevo sin confirmar antes con Sales que ya no los necesita.",
      example: {
        lines: [
          {
            product: { id: 5004, code: "P-5004", name: "Kris 500ml" },
            total: 1500,
            appliedRuleIds: [4821],
            totalWithDiscount: 1425,
          },
        ],
      },
    },
    notes: ["Sin dependencias en tiempo de cálculo con otros microservicios — Sales le manda todo servido (CLAUDE.md §12)."],
  },
]
