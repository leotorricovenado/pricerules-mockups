import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { computeApplicationTotals } from "../data/applications"
import { MAGNITUDE_HUE } from "../chart-colors"
import type { PriceRule } from "@/features/price-rules/types"

const chartConfig: ChartConfig = {
  timesApplied: {
    label: "Veces aplicada",
    theme: { light: MAGNITUDE_HUE.light, dark: MAGNITUDE_HUE.dark },
  },
}

function truncate(name: string, max = 32) {
  return name.length > max ? `${name.slice(0, max - 1)}…` : name
}

// Ranking, no identidad -> horizontal bar en un solo hue (dataviz: "compare magnitude" = sequential
// one hue). Todas las barras miden lo mismo (veces aplicada), ninguna es "la serie".
export function TopRulesChart({ rules }: { rules: PriceRule[] }) {
  const data = useMemo(
    () =>
      computeApplicationTotals(rules)
        .sort((a, b) => b.timesApplied - a.timesApplied)
        .slice(0, 10)
        .map((r) => ({ ...r, shortName: truncate(r.ruleName) }))
        .reverse(), // recharts dibuja barras horizontales de abajo hacia arriba
    [rules]
  )

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Top 10 reglas más aplicadas</CardTitle>
        <CardDescription>Cuántas veces cada regla determinó el precio de una línea de pedido</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[340px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 28, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis
              dataKey="shortName"
              type="category"
              tickLine={false}
              axisLine={false}
              width={190}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, _name, item) => (
                    <span>
                      {item.payload.ruleName}:{" "}
                      <strong className="font-mono">{Number(value).toLocaleString()}</strong>
                    </span>
                  )}
                />
              }
            />
            <Bar dataKey="timesApplied" fill="var(--color-timesApplied)" radius={4}>
              <LabelList dataKey="timesApplied" position="right" className="fill-foreground text-[11px]" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
