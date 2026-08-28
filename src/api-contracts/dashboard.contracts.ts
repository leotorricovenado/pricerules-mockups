import type { ApiContract } from "./types"

// Documentación viva del Dashboard (mismo criterio que priceRules.contracts.ts) — ninguno de estos
// dos endpoints existe hoy ni en el WAR legacy ni en ningún lado: son la propuesta para alimentar
// las gráficas nuevas. "Aplicaciones" viene de `price_rule_applied` (CLAUDE.md §8.7 — trazabilidad
// que el motor YA inserta al confirmar un pedido), así que el dato de origen existe, solo falta el
// endpoint de agregación — no hay que construir un contador nuevo desde cero.
export const DASHBOARD_CONTRACTS: ApiContract[] = [
  {
    id: "get-dashboard-summary",
    service: "price-rules",
    method: "GET",
    path: "/price-rules/dashboard/summary",
    summary: "KPIs de la fila superior del Dashboard",
    description:
      "Conteos agregados (total, activas, pendientes de aprobación) y desglose por estado de aprobación / tipo de resultado / empresa. Sin paginar — son counts, no filas.",
    status: "planned",
    responseBody: {
      description: "Envelope { data, code, message } — misma convención que el resto de Reglas de Precio (CLAUDE.md §19).",
      example: {
        data: {
          total: 108,
          active: 62,
          pendingApproval: 12,
          byApprovalStatus: { APPROVED: 62, WAITING_COMMERCIAL_APPROVAL: 9, WAITING_MANAGEMENT_APPROVAL: 3, REJECTED: 34 },
          byOutcomeType: { PRODUCT: 41, DISCOUNT_PERCENTAGE: 33, PRODUCT_SURCHARGE: 8, DISCOUNT_AMOUNT: 14, FIXED_PRICE: 12 },
          byCompany: { VEMASSA: 71, IVSA: 24, FACRULESA: 13 },
        },
        code: 200,
        message: "OK",
      },
    },
    notes: [
      "No hay equivalente legacy: PriceRuleController (WAR) no expone counts agregados, solo activePriceRules() con el detalle completo de lo que está en caché (CLAUDE.md §7).",
    ],
  },
  {
    id: "get-dashboard-applications",
    service: "price-rules",
    method: "GET",
    path: "/price-rules/dashboard/applications",
    summary: "Serie de aplicaciones en el tiempo + ranking por regla",
    description:
      "Agrega price_rule_applied (CLAUDE.md §8.7) en dos formas: serie diaria para el chart de tendencia, y total por regla para el ranking 'más aplicadas'. El motor ya inserta una fila en price_rule_applied por cada línea de pedido donde una regla determinó el precio — este endpoint solo agrupa lo que ya se está guardando, no agrega tracking nuevo.",
    status: "planned",
    queryParams: [
      { name: "fromDate", type: "string (yyyy-mm-dd)", required: true, description: "Inicio del rango." },
      { name: "toDate", type: "string (yyyy-mm-dd)", required: true, description: "Fin del rango." },
      { name: "limit", type: "number", description: "Tope de reglas en el ranking (el Dashboard pide 10)." },
    ],
    responseBody: {
      example: {
        data: {
          daily: [
            { date: "2026-08-26", applications: 214 },
            { date: "2026-08-27", applications: 238 },
            { date: "2026-08-28", applications: 201 },
          ],
          topRules: [
            { ruleId: 4822, ruleName: "3x2 Agua Speranza 2L", timesApplied: 812 },
            { ruleId: 4821, ruleName: "Descuento volumen Kris — Canal Moderno", timesApplied: 540 },
          ],
        },
        code: 200,
        message: "OK",
      },
    },
    notes: [
      "En este mockup, sin backend, ambas series se sintetizan de forma determinística — ver src/features/dashboard/data/applications.ts.",
    ],
  },
]
