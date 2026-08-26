import { useRef, useState } from "react"
import { toast } from "sonner"
import { FileSpreadsheet, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Carga masiva — el origen/formato real (`price_rule_import`) está pendiente de definir
// (CLAUDE.md §14). Este modal simula el flujo para validar la UX mientras se confirma el contrato.
export function BulkUploadDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function reset() {
    setFileName(null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o)
        if (!o) reset()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carga Regla de Precio Masivo</DialogTitle>
          <DialogDescription>
            Subí una planilla con varias reglas para crearlas de una sola vez. Formato de
            ejemplo pendiente de confirmar con Comercial.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:bg-muted/50"
          >
            <Upload className="size-6 text-muted-foreground" />
            <span className="text-sm font-medium">Arrastrá tu archivo acá o hacé clic para buscar</span>
            <span className="text-xs text-muted-foreground">.xlsx o .csv, hasta 10&nbsp;MB</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.csv"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />

          {fileName && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
              <FileSpreadsheet className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate">{fileName}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setFileName(null)}
                aria-label="Quitar archivo"
              >
                <X />
              </Button>
            </div>
          )}

          <Button
            variant="link"
            className="h-auto p-0 text-xs"
            onClick={() =>
              toast.info("Plantilla no disponible todavía", {
                description: "El formato de la planilla está pendiente de definir.",
              })
            }
          >
            Descargar plantilla de ejemplo
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            disabled={!fileName}
            onClick={() => {
              toast.success("Carga simulada", {
                description: `"${fileName}" se procesaría en el backend real — acá no pasa nada.`,
              })
              onOpenChange(false)
            }}
          >
            Cargar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
