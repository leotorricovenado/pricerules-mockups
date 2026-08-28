import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { PriceRule } from "../types"

// Modal de confirmación para "Rechazar (ya aprobada)" — acordado en la reunión del 2026-08-27
// (CLAUDE.md §21): el Admin puede revertir una aprobación por error de typeo, sin pasar por el
// Gerente Comercial de nuevo. Acción sensible (desactiva una regla que puede estar corriendo en
// producción ahora mismo) — por eso lleva confirmación separada del modal de aprobación normal.
export function RejectApprovedDialog({
  rule,
  open,
  onOpenChange,
  onConfirm,
}: {
  rule: PriceRule | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            Rechazar regla ya aprobada
          </DialogTitle>
          <DialogDescription>
            {rule ? (
              <>
                <span className="font-medium text-foreground">
                  #{rule.id} — {rule.name}
                </span>
                <br />
                Esta regla ya está aprobada y puede estar activa ahora mismo. Rechazarla la pasa a
                Rechazada y la desactiva de inmediato. Usalo solo para corregir un error de
                aprobación — para dejarla de aplicar temporalmente, usá Desactivar en vez de esto.
              </>
            ) : null}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Sí, rechazar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
