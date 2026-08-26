import { useState } from "react"
import { Plus, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ScaleRow, ScaleType } from "../types"
import { SCALE_TYPE_LABELS } from "../labels"

// Sub-panel dinámico cuando Tipo de Regla = Escala. ESPECIFICACION-UI-CAPTURADA.md §2.
// `findByOutputId()` no tiene ORDER BY (CLAUDE.md §8.4) — se agrega una advertencia inline
// si el usuario carga escalas que se solapan, para no repetir ese defecto en el mockup.
export function ScaleEditor({
  scaleType,
  onScaleTypeChange,
  scales,
  onChange,
}: {
  scaleType: ScaleType
  onScaleTypeChange: (type: ScaleType) => void
  scales: ScaleRow[]
  onChange: (scales: ScaleRow[]) => void
}) {
  const [from, setFrom] = useState("0")
  const [to, setTo] = useState("")
  const [noLimit, setNoLimit] = useState(false)
  const [value, setValue] = useState("")

  const overlaps = hasOverlap(scales)

  function addScale() {
    const fromNum = Number(from)
    const toNum = noLimit ? null : to === "" ? null : Number(to)
    const valueNum = Number(value)
    if (Number.isNaN(fromNum) || Number.isNaN(valueNum)) return
    onChange([
      ...scales,
      { id: crypto.randomUUID(), from: fromNum, to: toNum, value: valueNum },
    ])
    setFrom("0")
    setTo("")
    setNoLimit(false)
    setValue("")
  }

  function removeScale(id: string) {
    onChange(scales.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <div className="grid grid-cols-2 gap-4 sm:max-w-xs">
        <div className="space-y-1.5">
          <Label>Tipo de Validación</Label>
          <div className="flex gap-1">
            {(["QUANTITY", "AMOUNT"] as ScaleType[]).map((t) => (
              <Button
                key={t}
                type="button"
                size="sm"
                variant={scaleType === t ? "default" : "outline"}
                onClick={() => onScaleTypeChange(t)}
              >
                {SCALE_TYPE_LABELS[t]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="scale-from">Desde</Label>
          <Input id="scale-from" type="number" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scale-to">Hasta</Label>
          <Input
            id="scale-to"
            type="number"
            value={to}
            disabled={noLimit}
            onChange={(e) => setTo(e.target.value)}
          />
          <div className="flex items-center gap-1.5 pt-1">
            <Checkbox
              id="scale-nolimit"
              checked={noLimit}
              onCheckedChange={(c) => setNoLimit(c === true)}
            />
            <Label htmlFor="scale-nolimit" className="text-xs font-normal text-muted-foreground">
              Este valor no tiene límite
            </Label>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scale-value">Valor</Label>
          <Input id="scale-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <Button type="button" onClick={addScale} className="gap-1.5">
          <Plus /> Adicionar Escala
        </Button>
      </div>

      {overlaps && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Hay escalas que se solapan. En el motor actual esto es no determinista (sin
            <code className="mx-1 rounded bg-background/60 px-1">ORDER BY</code>
            en la consulta) — ordená o ajustá los rangos para evitar ambigüedad.
          </span>
        </div>
      )}

      {scales.length > 0 && (
        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Desde</TableHead>
                <TableHead>Hasta</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...scales]
                .sort((a, b) => a.from - b.from)
                .map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.from}</TableCell>
                    <TableCell>{s.to ?? "Sin límite"}</TableCell>
                    <TableCell>{s.value}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeScale(s.id)}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

function hasOverlap(scales: ScaleRow[]): boolean {
  const sorted = [...scales].sort((a, b) => a.from - b.from)
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i]
    const next = sorted[i + 1]
    if (current.to === null || current.to >= next.from) return true
  }
  return false
}
