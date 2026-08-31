import { useMemo } from "react"
import { CheckCircle2, Clock, Tag, TrendingUp } from "lucide-react"
import { usePriceRules } from "@/features/price-rules/store"
import { StatTile } from "../components/StatTile"
import { ApplicationsTrendChart } from "../components/ApplicationsTrendChart"
import { TopRulesChart } from "../components/TopRulesChart"
import { ApprovalStatusChart } from "../components/ApprovalStatusChart"
import { OutcomeTypeChart } from "../components/OutcomeTypeChart"
import { CompanyChart } from "../components/CompanyChart"
import { ChannelChart } from "../components/ChannelChart"
import { SubchannelChart } from "../components/SubchannelChart"
import { computeDailySeries } from "../data/applications"

export function DashboardPage() {
  const { rules } = usePriceRules()

  const total = rules.length
  const active = rules.filter((r) => r.status === "ENABLE" && r.approvalStatus === "APPROVED").length
  const pending = rules.filter(
    (r) => r.approvalStatus === "WAITING_COMMERCIAL_APPROVAL" || r.approvalStatus === "WAITING_MANAGEMENT_APPROVAL"
  ).length
  // Últimos 30 días fijo para el KPI (independiente del toggle 7/30/90 del chart de tendencia).
  const last30 = useMemo(
    () => computeDailySeries(rules, 30).reduce((sum, d) => sum + d.applications, 0),
    [rules]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Vista general de Reglas de Precio — actividad y estado de configuración
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Total de reglas" value={total.toLocaleString()} icon={Tag} />
        <StatTile
          label="Reglas activas"
          value={active.toLocaleString()}
          icon={CheckCircle2}
          accent="good"
          hint={`${total ? Math.round((active / total) * 100) : 0}% del total`}
        />
        <StatTile
          label="Pendientes de aprobación"
          value={pending.toLocaleString()}
          icon={Clock}
          accent="warning"
        />
        <StatTile
          label="Usos (30 días)"
          value={last30.toLocaleString()}
          icon={TrendingUp}
          hint="Reglas activas y aprobadas"
        />
      </div>

      <ApplicationsTrendChart rules={rules} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopRulesChart rules={rules} />
        <ApprovalStatusChart rules={rules} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OutcomeTypeChart rules={rules} />
        <CompanyChart rules={rules} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChannelChart rules={rules} />
        <SubchannelChart rules={rules} />
      </div>
    </div>
  )
}
