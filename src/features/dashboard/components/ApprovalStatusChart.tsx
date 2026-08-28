import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { STATUS_HUES } from "../chart-colors"
import type { ApprovalStatus, PriceRule } from "@/features/price-rules/types"

// Mismo mapeo de significado que RuleStatusBadge.tsx (aprobada=verde, pendiente=ámbar,
// rechazada=rojo) — el color de cada barra sigue el ESTADO, no un orden categórico arbitrario.
const STATUS_ORDER: { key: ApprovalStatus; label: string; hue: keyof typeof STATUS_HUES }[] = [
  { key: "REJECTED", label: "Rechazada", hue: "critical" },
  { key: "WAITING_MANAGEMENT_APPROVAL", label: "Pend. gerencial", hue: "warning" },
  { key: "WAITING_COMMERCIAL_APPROVAL", label: "Pend. comercial", hue: "warning" },
  { key: "APPROVED", label: "Aprobada", hue: "good" },
]

const chartConfig: ChartConfig = Object.fromEntries(
  STATUS_ORDER.map((s) => [s.key, { label: s.label, color: STATUS_HUES[s.hue].light }])
)

export function ApprovalStatusChart({ rules }: { rules: PriceRule[] }) {
  const data = useMemo(
    () =>
      STATUS_ORDER.map((s) => ({
        key: s.key,
        label: s.label,
        count: rules.filter((r) => r.approvalStatus === s.key).length,
        fill: STATUS_HUES[s.hue].light,
      })),
    [rules]
  )

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Reglas por estado de aprobación</CardTitle>
        <CardDescription>{rules.length} reglas configuradas en total</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 28, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={120}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, _name, item) => (
                    <span>
                      {item.payload.label}: <strong className="font-mono">{Number(value).toLocaleString()}</strong>
                    </span>
                  )}
                />
              }
            />
            <Bar dataKey="count" radius={4}>
              {data.map((d) => (
                <Cell key={d.key} fill={d.fill} />
              ))}
              <LabelList dataKey="count" position="right" className="fill-foreground text-[11px]" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
