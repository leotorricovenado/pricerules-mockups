import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

// yyyy-mm-dd (ISO, sin hora) <-> Date local. No usar `new Date(iso)` para esto: interpreta la
// fecha como UTC medianoche y puede correrse un día según la zona horaria del navegador.
export function parseISODate(iso: string | undefined): Date | undefined {
  if (!iso) return undefined
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d)
}

export function toISODate(date: Date | undefined): string {
  if (!date) return ""
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function formatDateRangeLabel(range: DateRange | undefined): string {
  if (!range?.from) return ""
  if (!range.to || range.to.getTime() === range.from.getTime()) {
    return format(range.from, "dd/MM/yyyy")
  }
  return `${format(range.from, "dd/MM/yyyy")} – ${format(range.to, "dd/MM/yyyy")}`
}
