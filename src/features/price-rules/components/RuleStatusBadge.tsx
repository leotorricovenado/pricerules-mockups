import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ApprovalStatus, RuleStatus } from "../types";

// "Activo"/"Inactivo" en todos lados (badge, dot, filtro) — nunca "Habilitada"/"Deshabilitada".
// No existe un tercer estado "Eliminada": el soft delete del negocio ES este toggle.
// Diseño outline (borde de color + texto de color, sin relleno) en vez del badge sólido.
const STATUS_CONFIG: Record<
  RuleStatus,
  { label: string; className: string; dotClassName: string }
> = {
  ENABLE: {
    label: "Activo",
    className: "border-emerald-500/50 text-emerald-700 dark:text-emerald-400",
    dotClassName: "bg-emerald-500",
  },
  DISABLED: {
    label: "Inactivo",
    className: "border-destructive/50 text-destructive",
    dotClassName: "bg-destructive",
  },
};

const APPROVAL_CONFIG: Record<
  ApprovalStatus,
  { label: string; className: string }
> = {
  APPROVED: {
    label: "Aprobada",
    className: "border-emerald-500/50 text-emerald-700 dark:text-emerald-400",
  },
  WAITING_COMMERCIAL_APPROVAL: {
    label: "Pend. aprobación comercial",
    className: "border-amber-500/50 text-amber-700 dark:text-amber-400",
  },
  WAITING_MANAGEMENT_APPROVAL: {
    label: "Pend. aprobación gerencial",
    className: "border-amber-500/50 text-amber-700 dark:text-amber-400",
  },
  REJECTED: {
    label: "Rechazada",
    className: "border-destructive/50 text-destructive",
  },
};

export function RuleStatusBadge({ status }: { status: RuleStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <Badge variant="outline" className={cn("bg-transparent", cfg.className)}>
      {cfg.label}
    </Badge>
  );
}

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const cfg = APPROVAL_CONFIG[status];
  return (
    <Badge variant="outline" className={cn("bg-transparent", cfg.className)}>
      {cfg.label}
    </Badge>
  );
}

// Punto de color compacto (columna "Activo" del listado) con el mismo significado que RuleStatusBadge.
export function StatusDot({ status }: { status: RuleStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn("inline-block size-2.5 rounded-full", cfg.dotClassName)}
        />
      </TooltipTrigger>
      <TooltipContent>{cfg.label}</TooltipContent>
    </Tooltip>
  );
}

export const RULE_STATUS_LABELS: Record<RuleStatus, string> = {
  ENABLE: STATUS_CONFIG.ENABLE.label,
  DISABLED: STATUS_CONFIG.DISABLED.label,
};
