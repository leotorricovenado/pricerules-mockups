import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { computeDailySeries } from "../data/applications"
import { MAGNITUDE_HUE } from "../chart-colors"
import type { PriceRule } from "@/features/price-rules/types"

const PERIODS = [
  { days: 7, label: "7 días" },
  { days: 30, label: "30 días" },
  { days: 90, label: "90 días" },
] as const

const chartConfig: ChartConfig = {
  applications: {
    label: "Usos",
    theme: { light: MAGNITUDE_HUE.light, dark: MAGNITUDE_HUE.dark },
  },
}

function formatDayTick(iso: string) {
  const [, m, d] = iso.split("-")
  return `${d}/${m}`
}

// "Cuántas veces fueron aplicadas las reglas" a lo largo del tiempo — trend over time, un solo
// eje, una sola serie (dataviz: line/area para tendencia, sequential/1 hue, sin eje dual).
export function ApplicationsTrendChart({ rules }: { rules: PriceRule[] }) {
  const [days, setDays] = useState<(typeof PERIODS)[number]["days"]>(30)
  const series = useMemo(() => computeDailySeries(rules, days), [rules, days])
  const total = useMemo(() => series.reduce((sum, d) => sum + d.applications, 0), [series])

  return (
    <Card className="p-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Usos de reglas en el tiempo</CardTitle>
        <CardDescription>
          {total.toLocaleString()} usos en los últimos {days} días · agregado de todas las reglas
          activas y aprobadas
        </CardDescription>
        <CardAction>
          <div className="flex gap-0.5 rounded-lg bg-muted p-0.5">
            {PERIODS.map((p) => (
              <Button
                key={p.days}
                type="button"
                size="sm"
                variant="ghost"
                className={cn("h-7 px-2.5 text-xs", days === p.days && "bg-background shadow-sm")}
                onClick={() => setDays(p.days)}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <AreaChart data={series} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-applications)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-applications)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDayTick}
              tickLine={false}
              axisLine={false}
              minTickGap={32}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} width={36} tickMargin={4} allowDecimals={false} />
            <ChartTooltip
              cursor={{ stroke: "var(--border)" }}
              content={
                <ChartTooltipContent labelFormatter={(value) => formatDayTick(String(value))} indicator="line" />
              }
            />
            <Area
              dataKey="applications"
              type="monotone"
              fill="url(#fillApplications)"
              stroke="var(--color-applications)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
