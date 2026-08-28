import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { COMPANY_LABELS } from "@/features/price-rules/labels"
import { MAGNITUDE_HUE } from "../chart-colors"
import type { Company, PriceRule } from "@/features/price-rules/types"

const COMPANY_ORDER: Company[] = ["VEMASSA", "IVSA", "FACRULESA"]

const chartConfig: ChartConfig = {
  count: { label: "Reglas", theme: { light: MAGNITUDE_HUE.light, dark: MAGNITUDE_HUE.dark } },
}

// Hoy el motor no filtra realmente por empresa (CLAUDE.md §11/§19 — company se lee pero nunca se
// usa para restringir qué reglas aplican) — este desglose es informativo, no implica que las
// reglas estén particionadas de verdad por empresa en el cálculo.
export function CompanyChart({ rules }: { rules: PriceRule[] }) {
  const data = useMemo(
    () =>
      COMPANY_ORDER.map((company) => ({
        company,
        label: COMPANY_LABELS[company],
        count: rules.filter((r) => r.company === company).length,
      })),
    [rules]
  )

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Reglas por empresa</CardTitle>
        <CardDescription>Distribución de reglas configuradas por empresa</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
          <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
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
