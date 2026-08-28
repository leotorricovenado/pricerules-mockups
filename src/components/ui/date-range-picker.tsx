import * as React from "react"
import { CalendarIcon, X } from "lucide-react"
import { es } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { formatDateRangeLabel } from "@/lib/date"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
}

// Selector de rango de fechas (Popover + Calendar en modo "range") — reemplaza los pares de
// <input type="date"> Desde/Hasta del listado de Reglas de Precio (pedido en revisión de mockup).
// Un solo control en vez de dos campos sueltos: más rápido de usar y evita rangos invertidos.
export function DateRangePicker({
  value,
  onChange,
  placeholder = "Seleccionar rango",
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const hasValue = Boolean(value?.from)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start gap-2 font-normal",
            !hasValue && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-3.5 shrink-0" />
          <span className="flex-1 truncate text-left">
            {hasValue ? formatDateRangeLabel(value) : placeholder}
          </span>
          {hasValue && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Limpiar rango"
              className="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation()
                onChange(undefined)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation()
                  onChange(undefined)
                }
              }}
            >
              <X className="size-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          locale={es}
          numberOfMonths={2}
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          className="p-3"
        />
        <div className="flex justify-end border-t p-2">
          <Button variant="ghost" size="sm" onClick={() => onChange(undefined)} disabled={!hasValue}>
            Borrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
