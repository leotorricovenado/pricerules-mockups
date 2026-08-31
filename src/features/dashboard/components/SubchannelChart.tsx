import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { SUB_SALE_CHANNELS } from "@/features/price-rules/data/catalogs"
import { MAGNITUDE_HUE } from "../chart-colors"
import type { PriceRule } from "@/features/price-rules/types"

const chartConfig: ChartConfig = {
  count: { label: "Reglas", theme: { light: MAGNITUDE_HUE.light, dark: MAGNITUDE_HUE.dark } },
}

// Mismo criterio que ChannelChart.tsx, pero para Subcanal (CriteriaRow tipo SUBCANAL — hasta hace
// poco llamado "Sector" en el mockup, renombrado a pedido de negocio). Mismo límite de datos: solo
// las reglas armadas a mano traen criteriaRows poblado.
export function SubchannelChart({ rules }: { rules: PriceRule[] }) {
  const data = useMemo(
    () =>
      SUB_SALE_CHANNELS.map((subchannel) => ({
        code: subchannel.code,
        label: subchannel.name,
        count: rules.filter((r) => r.criteriaRows.some((c) => c.type === "SUBCANAL" && c.code === subchannel.code))
          .length,
      })),
    [rules]
  )

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Reglas por subcanal</CardTitle>
        <CardDescription>Reglas con un Subcanal como Criterio de la Regla</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
          <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} interval={0} />
            <YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} tickMargin={4} />
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
            <Bar dataKey="count" fill="var(--color-count)" radius={4}>
              <LabelList dataKey="count" position="top" className="fill-foreground text-[11px]" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
