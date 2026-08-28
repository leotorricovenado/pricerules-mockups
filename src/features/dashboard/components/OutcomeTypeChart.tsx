import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { OUTCOME_TYPE_LABELS } from "@/features/price-rules/labels"
import { MAGNITUDE_HUE } from "../chart-colors"
import type { OutcomeType, PriceRule } from "@/features/price-rules/types"

const OUTCOME_ORDER: OutcomeType[] = [
  "PRODUCT",
  "DISCOUNT_PERCENTAGE",
  "PRODUCT_SURCHARGE",
  "DISCOUNT_AMOUNT",
  "FIXED_PRICE",
]

// Etiquetas cortas para el eje — OUTCOME_TYPE_LABELS (labels.ts) trae el texto largo del
// formulario JSF original, demasiado ancho para un tick de eje.
const SHORT_LABELS: Record<OutcomeType, string> = {
  DISCOUNT_PERCENTAGE: "Dscto. %",
  DISCOUNT_AMOUNT: "Dscto. monto",
  FIXED_PRICE: "Precio fijo",
  PRODUCT: "Bonificación",
  PRODUCT_SURCHARGE: "Recargo",
}

const chartConfig: ChartConfig = {
  count: { label: "Reglas", theme: { light: MAGNITUDE_HUE.light, dark: MAGNITUDE_HUE.dark } },
}

export function OutcomeTypeChart({ rules }: { rules: PriceRule[] }) {
  const data = useMemo(
    () =>
      OUTCOME_ORDER.map((type) => ({
        type,
        label: SHORT_LABELS[type],
        fullLabel: OUTCOME_TYPE_LABELS[type],
        count: rules.filter((r) => r.outcomeType === type).length,
      })),
    [rules]
  )

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Reglas por tipo de resultado</CardTitle>
        <CardDescription>Qué pasa cuando la regla aplica</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
          <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} interval={0} tick={{ fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} tickMargin={4} />
            <ChartTooltip
              cursor={{ fill: "var(--muted)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, _name, item) => (
                    <span>
                      {item.payload.fullLabel}: <strong className="font-mono">{Number(value).toLocaleString()}</strong>
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
