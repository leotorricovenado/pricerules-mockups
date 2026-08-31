import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Plus, Eye, Pencil, Copy, CheckCircle2, PowerOff, Power, Upload, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable, defineColumns, FilterBar, defineFilters, type RowAction } from "@/components/data-table"
import { useAuth } from "@/app/auth"
import { usePriceRules } from "../store"
import { ApprovalStatusBadge, StatusDot } from "../components/RuleStatusBadge"
import { ApprovalDialog } from "../components/ApprovalDialog"
import { RejectApprovedDialog } from "../components/RejectApprovedDialog"
import { BulkUploadDialog } from "../components/BulkUploadDialog"
import {
  COMPANY_LABELS,
  OUTCOME_MODE_LABELS,
  OUTCOME_TYPE_LABELS,
  RULE_TYPE_LABELS,
  formatCreatorName,
  formatDate,
  formatDateTime,
} from "../labels"
import type { PriceRule } from "../types"

// Prueba de shadcn-ui-kit (github.com/oliviosubelza/shadcn-ui-kit): reemplaza la tabla + filtros +
// paginación armados a mano por sus componentes DataTable/FilterBar (src/components/data-table/,
// copiados verbatim del kit). El resto de la pantalla (header, diálogos de aprobación/rechazo/carga
// masiva) no cambia.
interface RuleFilterValues {
  [key: string]: unknown
  company?: string
  approvalStatus?: string
  status?: string
  ruleType?: string
  createdBy?: string
  fromDateFrom?: string
  fromDateTo?: string
  thruDateFrom?: string
  thruDateTo?: string
}

export function PriceRuleListPage() {
  const { rules, approveRule, rejectRule, toggleEnabled, duplicateRule } = usePriceRules()
  const { can } = useAuth()
  const navigate = useNavigate()

  const [filters, setFilters] = useState<Partial<RuleFilterValues>>({})
  const [approvalTarget, setApprovalTarget] = useState<PriceRule | null>(null)
  const [rejectApprovedTarget, setRejectApprovedTarget] = useState<PriceRule | null>(null)
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false)

  // Deriva las opciones del filtro "Creador de Regla" de las reglas existentes — no hay un
  // servicio de usuarios en el mockup (§21, admin acordó agregarlo en la reunión del 2026-08-27).
  const creators = useMemo(() => Array.from(new Set(rules.map((r) => r.createdBy))).sort(), [rules])

  const filterDefs = useMemo(
    () =>
      defineFilters<RuleFilterValues>([
        {
          type: "select",
          id: "company",
          label: "Empresa",
          options: Object.entries(COMPANY_LABELS).map(([value, label]) => ({ value, label })),
        },
        {
          type: "select",
          id: "approvalStatus",
          label: "Aprobación",
          options: [
            { value: "APPROVED", label: "Aprobada" },
            { value: "WAITING_COMMERCIAL_APPROVAL", label: "Pend. aprobación comercial" },
            { value: "WAITING_MANAGEMENT_APPROVAL", label: "Pend. aprobación gerencial" },
            { value: "REJECTED", label: "Rechazada" },
          ],
        },
        {
          type: "select",
          id: "status",
          label: "Estado",
          options: [
            { value: "ENABLE", label: "Activo" },
            { value: "DISABLED", label: "Inactivo" },
          ],
        },
        {
          type: "select",
          id: "ruleType",
          label: "Tipo de Resolución",
          options: Object.entries(RULE_TYPE_LABELS).map(([value, label]) => ({ value, label })),
        },
        {
          type: "select",
          id: "createdBy",
          label: "Creador",
          options: creators.map((c) => ({ value: c, label: formatCreatorName(c) })),
        },
        { type: "daterange", id: "fromDate", label: "Fecha Inicio", fromKey: "fromDateFrom", toKey: "fromDateTo" },
        { type: "daterange", id: "thruDate", label: "Fecha Fin", fromKey: "thruDateFrom", toKey: "thruDateTo" },
      ]),
    [creators]
  )

  const filtered = useMemo(() => {
    return rules.filter((r) => {
      if (filters.company && r.company !== filters.company) return false
      if (filters.approvalStatus && r.approvalStatus !== filters.approvalStatus) return false
      if (filters.status && r.status !== filters.status) return false
      if (filters.ruleType && r.ruleType !== filters.ruleType) return false
      if (filters.createdBy && r.createdBy !== filters.createdBy) return false
      // FilterBar entrega el rango como datetime ISO completo (T00:00:00.000Z / T23:59:59.999Z);
      // fromDate/thruDate son yyyy-mm-dd puros, por eso se compara solo la parte fecha.
      if (filters.fromDateFrom && r.fromDate < filters.fromDateFrom.slice(0, 10)) return false
      if (filters.fromDateTo && r.fromDate > filters.fromDateTo.slice(0, 10)) return false
      if (filters.thruDateFrom && r.thruDate < filters.thruDateFrom.slice(0, 10)) return false
      if (filters.thruDateTo && r.thruDate > filters.thruDateTo.slice(0, 10)) return false
      return true
    })
  }, [rules, filters])

  const columns = useMemo(
    () =>
      defineColumns<PriceRule>([
        {
          id: "id",
          header: "Código",
          accessorKey: "id",
          size: 90,
          minSize: 70,
          cell: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span>,
        },
        {
          id: "name",
          header: "Nombre",
          accessorKey: "name",
          size: 220,
          minSize: 160,
          cell: (row) => <span className="font-medium">{row.name}</span>,
        },
        {
          id: "description",
          header: "Descripción",
          accessorKey: "description",
          size: 260,
          minSize: 160,
          cell: (row) => <span className="text-muted-foreground">{row.description || "—"}</span>,
        },
        {
          id: "createdAt",
          header: "Creado",
          accessorKey: "createdAt",
          size: 150,
          minSize: 120,
          cell: (row) => <span className="text-muted-foreground">{formatDateTime(row.createdAt)}</span>,
        },
        {
          id: "vigencia",
          header: "Vigencia",
          size: 170,
          minSize: 140,
          enableSorting: false,
          cell: (row) => (
            <span className="text-muted-foreground">
              {formatDate(row.fromDate)} – {formatDate(row.thruDate)}
            </span>
          ),
        },
        {
          id: "outcomeMode",
          header: "Tipo",
          accessorKey: "outcomeMode",
          size: 110,
          minSize: 90,
          cell: (row) => OUTCOME_MODE_LABELS[row.outcomeMode],
        },
        {
          id: "outcomeType",
          header: "Tipo de Resultado",
          accessorKey: "outcomeType",
          size: 200,
          minSize: 140,
          cell: (row) => <span className="text-muted-foreground">{OUTCOME_TYPE_LABELS[row.outcomeType]}</span>,
        },
        {
          id: "approvalStatus",
          header: "Estado",
          accessorKey: "approvalStatus",
          size: 190,
          minSize: 150,
          enableSorting: false,
          cell: (row) => <ApprovalStatusBadge status={row.approvalStatus} />,
        },
        {
          id: "status",
          header: "Activo",
          accessorKey: "status",
          size: 70,
          minSize: 60,
          enableSorting: false,
          enableResizing: false,
          meta: { align: "center" },
          cell: (row) => <StatusDot status={row.status} />,
        },
      ]),
    []
  )

  function rowActions(r: PriceRule): RowAction<PriceRule>[] {
    const actions: RowAction<PriceRule>[] = [
      { label: "Ver detalle", icon: Eye, onClick: (row) => navigate(`/reglas-precio/${row.id}`) },
    ]
    if (can("price_rules.edit") && r.approvalStatus !== "APPROVED") {
      actions.push({ label: "Editar", icon: Pencil, onClick: (row) => navigate(`/reglas-precio/${row.id}/editar`) })
    }
    if (can("price_rules.duplicate")) {
      actions.push({ label: "Duplicar", icon: Copy, onClick: (row) => duplicateRule(row.id) })
    }
    if (can("price_rules.approve") && r.approvalStatus === "WAITING_COMMERCIAL_APPROVAL") {
      actions.push({ label: "Aprobar / Rechazar", icon: CheckCircle2, onClick: (row) => setApprovalTarget(row) })
    }
    if (can("price_rules.reject_approved") && r.approvalStatus === "APPROVED") {
      actions.push({
        label: "Rechazar (ya aprobada)",
        icon: Ban,
        variant: "destructive",
        separator: true,
        onClick: (row) => setRejectApprovedTarget(row),
      })
    }
    if (can("price_rules.toggle_status")) {
      actions.push({
        label: r.status === "ENABLE" ? "Desactivar" : "Activar",
        icon: r.status === "ENABLE" ? PowerOff : Power,
        disabled: (row) => row.approvalStatus !== "APPROVED",
        separator: true,
        onClick: (row) => toggleEnabled(row.id),
      })
    }
    return actions
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reglas de Precio</h1>
          <p className="text-sm text-muted-foreground">
            {rules.length} reglas · {rules.filter((r) => r.status === "ENABLE").length} activas
          </p>
        </div>
        <div className="flex gap-2">
          {can("price_rules.bulk_import") && (
            <Button variant="outline" className="gap-1.5" onClick={() => setBulkUploadOpen(true)}>
              <Upload /> Carga Regla de Precio Masivo
            </Button>
          )}
          {can("price_rules.create") && (
            <Button asChild className="gap-1.5">
              <Link to="/reglas-precio/nueva">
                <Plus /> Nueva Regla
              </Link>
            </Button>
          )}
        </div>
      </div>

      <DataTable
        tableId="price-rules"
        columns={columns}
        data={filtered}
        getRowId={(r) => String(r.id)}
        onRowClick={(r) => navigate(`/reglas-precio/${r.id}`)}
        rowActions={rowActions}
        searchable
        searchPlaceholder="Nombre o código…"
        searchKeys={["name", "id"]}
        filterBar={
          <FilterBar
            defs={filterDefs}
            values={filters}
            onChange={(update) => setFilters((prev) => ({ ...prev, ...update }))}
          />
        }
        clientPagination
        defaultPageSize={10}
        emptyTitle="Sin resultados"
        emptyMessage="No se encontraron reglas con esos filtros."
        exportable
        exportFilename="reglas-precio"
      />

      <ApprovalDialog
        rule={approvalTarget}
        open={approvalTarget !== null}
        onOpenChange={(o) => !o && setApprovalTarget(null)}
        onApprove={(exclusive) => {
          if (approvalTarget) approveRule(approvalTarget.id, exclusive)
          setApprovalTarget(null)
        }}
        onReject={() => {
          if (approvalTarget) rejectRule(approvalTarget.id)
          setApprovalTarget(null)
        }}
      />

      <RejectApprovedDialog
        rule={rejectApprovedTarget}
        open={rejectApprovedTarget !== null}
        onOpenChange={(o) => !o && setRejectApprovedTarget(null)}
        onConfirm={() => {
          if (rejectApprovedTarget) rejectRule(rejectApprovedTarget.id)
          setRejectApprovedTarget(null)
        }}
      />

      <BulkUploadDialog open={bulkUploadOpen} onOpenChange={setBulkUploadOpen} />
    </div>
  )
}
