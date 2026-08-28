import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatTileProps {
  label: string
  value: string
  icon: LucideIcon
  hint?: string
  accent?: "default" | "good" | "warning" | "critical"
}

const ACCENT_CLASSES: Record<NonNullable<StatTileProps["accent"]>, string> = {
  default: "bg-muted text-foreground",
  good: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  critical: "bg-destructive/10 text-destructive",
}

export function StatTile({ label, value, icon: Icon, hint, accent = "default" }: StatTileProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
          {hint && <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", ACCENT_CLASSES[accent])}>
          <Icon className="size-4.5" />
        </div>
      </div>
    </Card>
  )
}
