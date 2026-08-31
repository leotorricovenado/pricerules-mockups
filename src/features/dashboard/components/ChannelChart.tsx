import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { SALE_CHANNELS } from "@/features/price-rules/data/catalogs"
import { MAGNITUDE_HUE } from "../chart-colors"
import type { PriceRule } from "@/features/price-rules/types"

const chartConfig: ChartConfig = {
  count: { label: "Reglas", theme: { light: MAGNITUDE_HUE.light, dark: MAGNITUDE_HUE.dark } },
}

// Cuenta reglas que tienen un Canal de venta como Criterio de la Regla (CriteriaRow tipo
// CANAL_VENTA) — no reglas "restringidas a" ese canal en ningún otro sentido; una regla Universal
// (sin ese criterio) no suma en ningún canal. Solo las 8 reglas armadas a mano
// (data/mock-price-rules.ts) traen criteriaRows poblado — las 100 reglas reales importadas
// (data/venado-price-rules.ts) no lo exponen en el listado real (CLAUDE.md §19), así que el
// desglose es genuino pero parco mientras esa limitación de datos siga así.
export function ChannelChart({ rules }: { rules: PriceRule[] }) {
  const data = useMemo(
    () =>
      SALE_CHANNELS.map((channel) => ({
        code: channel.code,
        label: channel.name,
        count: rules.filter((r) => r.criteriaRows.some((c) => c.type === "CANAL_VENTA" && c.code === channel.code))
          .length,
      })),
    [rules]
  )

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Reglas por canal de venta</CardTitle>
        <CardDescription>Reglas con un Canal de venta como Criterio de la Regla</CardDescription>
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
