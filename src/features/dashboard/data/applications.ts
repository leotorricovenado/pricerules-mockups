import type { PriceRule } from "@/features/price-rules/types"
import { toISODate } from "@/lib/date"

// Historial de aplicaciones de reglas (`price_rule_applied`, CLAUDE.md §8.7) — no existe en este
// mockup porque no hay backend, así que se sintetiza de forma determinística a partir del id de
// cada regla / del día calendario. Determinístico == el dashboard no "parpadea" con números
// distintos en cada render ni pierde consistencia entre pestañas, sin necesitar un store aparte.
function mulberry32(seed: number) {
  let t = seed | 0
  return function random() {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const isActiveApproved = (r: PriceRule) => r.status === "ENABLE" && r.approvalStatus === "APPROVED"

export interface RuleApplicationTotal {
  ruleId: number
  ruleName: string
  outcomeType: PriceRule["outcomeType"]
  timesApplied: number
}

// Total histórico de aplicaciones por regla. Solo reglas activas y aprobadas suman aplicaciones
// reales — una regla rechazada o desactivada nunca llegó a calcular un pedido de venta.
export function computeApplicationTotals(rules: PriceRule[]): RuleApplicationTotal[] {
  return rules.filter(isActiveApproved).map((r) => {
    const rand = mulberry32(r.id * 2654435761)
    // Bonificación por frecuencia (3x2, etc.) se dispara en casi cualquier pedido que lleve ese
    // producto; una regla restringida a un cliente/canal puntual se dispara mucho menos seguido.
    const weight = r.outcomeMode === "FREQUENCY" ? 1.7 : r.criteriaRows.length > 0 ? 0.55 : 1
    const timesApplied = Math.max(1, Math.round((60 + rand() * 850) * weight))
    return { ruleId: r.id, ruleName: r.name, outcomeType: r.outcomeType, timesApplied }
  })
}

export interface DailyApplications {
  date: string // yyyy-mm-dd
  applications: number
}

// Serie diaria de aplicaciones (todas las reglas activas combinadas) para los últimos `days` días.
// Determinística por día calendario, con menos actividad en fin de semana y una leve tendencia
// ascendente hacia hoy — solo para que la línea cuente una historia creíble, no un dato real.
export function computeDailySeries(rules: PriceRule[], days: number): DailyApplications[] {
  const activeCount = Math.max(1, rules.filter(isActiveApproved).length)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const out: DailyApplications[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dayIndex = Math.floor(d.getTime() / 86_400_000)
    const rand = mulberry32(dayIndex * 2246822519)
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const base = activeCount * (isWeekend ? 2.1 : 4.6)
    const noise = 0.75 + rand() * 0.5
    const trend = 1 + (days - i) / (days * 6)
    out.push({ date: toISODate(d), applications: Math.round(base * noise * trend) })
  }
  return out
}
