import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ExclusiveOutcome, PriceRule } from "../types"

// Modal "Aprobar Regla de Precios" — ESPECIFICACION-UI-CAPTURADA.md §2 "Modales".
// El paso de aprobación permite fijar/confirmar exclusiveOutcome en ese momento, no solo al crear.
export function ApprovalDialog({
  rule,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: {
  rule: PriceRule | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove: (exclusiveOutcome: ExclusiveOutcome) => void
  onReject: () => void
}) {
  const [exclusive, setExclusive] = useState<ExclusiveOutcome>(rule?.exclusiveOutcome ?? "NONE")

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o)
        if (o) setExclusive(rule?.exclusiveOutcome ?? "NONE")
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aprobar Regla de Precios</DialogTitle>
          <DialogDescription>
            {rule ? (
              <>
                <span className="font-medium text-foreground">
                  #{rule.id} — {rule.name}
                </span>
                <br />
                Confirmá cómo compite esta regla frente a otras al momento de aplicarse.
              </>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={exclusive}
          onValueChange={(v) => setExclusive(v as ExclusiveOutcome)}
          className="gap-3 py-2"
        >
          <div className="flex items-start gap-2.5 rounded-lg border p-3">
            <RadioGroupItem value="NONE" id="excl-none" className="mt-0.5" />
            <Label htmlFor="excl-none" className="flex flex-col gap-0.5 font-normal">
              <span className="font-medium">Acumulable</span>
              <span className="text-xs text-muted-foreground">
                Puede sumarse a otras reglas del mismo tipo de resultado.
              </span>
            </Label>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg border p-3">
            <RadioGroupItem value="OUTCOME_TYPE" id="excl-type" className="mt-0.5" />
            <Label htmlFor="excl-type" className="flex flex-col gap-0.5 font-normal">
              <span className="font-medium">No Acumulable</span>
              <span className="text-xs text-muted-foreground">
                Si aplica, descarta cualquier otro tipo de resultado exclusivo en el mismo pedido.
              </span>
            </Label>
          </div>
        </RadioGroup>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="destructive" onClick={onReject}>
            Rechazar
          </Button>
          <Button onClick={() => onApprove(exclusive)}>Aprobar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
