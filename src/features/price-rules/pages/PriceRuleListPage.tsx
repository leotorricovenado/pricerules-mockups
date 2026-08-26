import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  MoreHorizontal,
  Plus,
  Search,
  Eye,
  Pencil,
  Copy,
  CheckCircle2,
  PowerOff,
  Power,
  ChevronLeft,
  ChevronRight,
  FilterX,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/app/auth"
import { usePriceRules } from "../store"
import { ApprovalStatusBadge, StatusDot } from "../components/RuleStatusBadge"
import { ApprovalDialog } from "../components/ApprovalDialog"
import { BulkUploadDialog } from "../components/BulkUploadDialog"
import {
  COMPANY_LABELS,
  OUTCOME_MODE_LABELS,
  OUTCOME_TYPE_LABELS,
  RULE_TYPE_LABELS,
  formatDate,
  formatDateTime,
} from "../labels"
import { SALE_CHANNELS } from "../data/catalogs"
import type { ApprovalStatus, Company, PriceRule, RuleStatus, RuleType } from "../types"

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

const EMPTY_FILTERS = {
  search: "",
  company: "ALL" as Company | "ALL",
  approval: "ALL" as ApprovalStatus | "ALL",
  status: "ALL" as RuleStatus | "ALL",
  resolutionType: "ALL" as RuleType | "ALL",
  channel: "ALL",
  startFrom: "",
  startTo: "",
  endFrom: "",
  endTo: "",
}

// Paginación numerada tipo "‹ Anterior 1 2 3 … 11 Siguiente ›" — colapsa en "…" (no clickeable)
// cuando hay más páginas de las que entran cómodas alrededor de la actual.
function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const siblingCount = 2
  if (total <= siblingCount * 2 + 3) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const left = Math.max(current - siblingCount, 1)
  const right = Math.min(current + siblingCount, total)
  const pages: (number | "ellipsis")[] = []
  if (left > 1) {
    pages.push(1)
    if (left > 2) pages.push("ellipsis")
  }
  for (let p = left; p <= right; p++) pages.push(p)
  if (right < total) {
    if (right < total - 1) pages.push("ellipsis")
    pages.push(total)
  }
  return pages
}

export function PriceRuleListPage() {
  const { rules, approveRule, rejectRule, toggleEnabled, duplicateRule } = usePriceRules()
  const { can } = useAuth()
  const navigate = useNavigate()

  const [search, setSearch] = useState(EMPTY_FILTERS.search)
  const [company, setCompany] = useState(EMPTY_FILTERS.company)
  const [approval, setApproval] = useState(EMPTY_FILTERS.approval)
  const [status, setStatus] = useState(EMPTY_FILTERS.status)
  const [resolutionType, setResolutionType] = useState(EMPTY_FILTERS.resolutionType)
  const [channel, setChannel] = useState(EMPTY_FILTERS.channel)
  const [startFrom, setStartFrom] = useState(EMPTY_FILTERS.startFrom)
  const [startTo, setStartTo] = useState(EMPTY_FILTERS.startTo)
  const [endFrom, setEndFrom] = useState(EMPTY_FILTERS.endFrom)
  const [endTo, setEndTo] = useState(EMPTY_FILTERS.endTo)

  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const [approvalTarget, setApprovalTarget] = useState<PriceRule | null>(null)
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false)

  const filtered = useMemo(() => {
    return rules.filter((r) => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !String(r.id).includes(search)) {
        return false
      }
      if (company !== "ALL" && r.company !== company) return false
      if (approval !== "ALL" && r.approvalStatus !== approval) return false
      if (status !== "ALL" && r.status !== status) return false
      if (resolutionType !== "ALL" && r.ruleType !== resolutionType) return false
      if (channel !== "ALL" && !r.criteriaRows.some((row) => row.type === "CANAL_VENTA" && row.code === channel)) {
        return false
      }
      if (startFrom && r.fromDate < startFrom) return false
      if (startTo && r.fromDate > startTo) return false
      if (endFrom && r.thruDate < endFrom) return false
      if (endTo && r.thruDate > endTo) return false
      return true
    })
  }, [
    rules,
    search,
    company,
    approval,
    status,
    resolutionType,
    channel,
    startFrom,
    startTo,
    endFrom,
    endTo,
  ])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const page = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const pageNumbers = useMemo(() => getPageNumbers(page, totalPages), [page, totalPages])

  function resetPage() {
    setCurrentPage(1)
  }

  function clearFilters() {
    setSearch(EMPTY_FILTERS.search)
    setCompany(EMPTY_FILTERS.company)
    setApproval(EMPTY_FILTERS.approval)
    setStatus(EMPTY_FILTERS.status)
    setResolutionType(EMPTY_FILTERS.resolutionType)
    setChannel(EMPTY_FILTERS.channel)
    setStartFrom(EMPTY_FILTERS.startFrom)
    setStartTo(EMPTY_FILTERS.startTo)
    setEndFrom(EMPTY_FILTERS.endFrom)
    setEndTo(EMPTY_FILTERS.endTo)
    resetPage()
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

      <Card className="space-y-4 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label>Buscar</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Nombre o código…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  resetPage()
                }}
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Empresa</Label>
            <Select
              value={company}
              onValueChange={(v) => {
                setCompany(v as Company | "ALL")
                resetPage()
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas</SelectItem>
                {Object.entries(COMPANY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Aprobación</Label>
            <Select
              value={approval}
              onValueChange={(v) => {
                setApproval(v as ApprovalStatus | "ALL")
                resetPage()
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas</SelectItem>
                <SelectItem value="APPROVED">Aprobada</SelectItem>
                <SelectItem value="WAITING_COMMERCIAL_APPROVAL">Pend. aprobación comercial</SelectItem>
                <SelectItem value="WAITING_MANAGEMENT_APPROVAL">Pend. aprobación gerencial</SelectItem>
                <SelectItem value="REJECTED">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Estado</Label>
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v as RuleStatus | "ALL")
                resetPage()
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="ENABLE">Activo</SelectItem>
                <SelectItem value="DISABLED">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label>Tipo de Resolución</Label>
            <Select
              value={resolutionType}
              onValueChange={(v) => {
                setResolutionType(v as RuleType | "ALL")
                resetPage()
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                {Object.entries(RULE_TYPE_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Canal</Label>
            <Select
              value={channel}
              onValueChange={(v) => {
                setChannel(v)
                resetPage()
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                {SALE_CHANNELS.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Fecha Inicio</Label>
            <div className="flex items-center gap-1.5">
              <Input
                type="date"
                aria-label="Fecha Inicio: Desde"
                value={startFrom}
                onChange={(e) => {
                  setStartFrom(e.target.value)
                  resetPage()
                }}
              />
              <span className="text-xs text-muted-foreground">–</span>
              <Input
                type="date"
                aria-label="Fecha Inicio: Hasta"
                value={startTo}
                onChange={(e) => {
                  setStartTo(e.target.value)
                  resetPage()
                }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Fecha Fin</Label>
            <div className="flex items-center gap-1.5">
              <Input
                type="date"
                aria-label="Fecha Fin: Desde"
                value={endFrom}
                onChange={(e) => {
                  setEndFrom(e.target.value)
                  resetPage()
                }}
              />
              <span className="text-xs text-muted-foreground">–</span>
              <Input
                type="date"
                aria-label="Fecha Fin: Hasta"
                value={endTo}
                onChange={(e) => {
                  setEndTo(e.target.value)
                  resetPage()
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={clearFilters}>
            <FilterX /> Limpiar Filtro
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Mostrar
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v))
                resetPage()
              }}
            >
              <SelectTrigger size="sm" className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            registros
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length === 0
              ? "Sin resultados"
              : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} de ${filtered.length}`}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Código</TableHead>
              <TableHead className="min-w-[180px]">Nombre</TableHead>
              <TableHead className="min-w-[240px]">Descripción</TableHead>
              <TableHead className="w-[150px]">Creado</TableHead>
              <TableHead className="w-[170px]">Vigencia</TableHead>
              <TableHead className="w-28">Tipo</TableHead>
              <TableHead className="w-[190px]">Tipo de Resultado</TableHead>
              <TableHead className="w-[190px]">Estado</TableHead>
              <TableHead className="w-16 text-center">Activo</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="py-10 text-center text-sm text-muted-foreground">
                  No se encontraron reglas con esos filtros.
                </TableCell>
              </TableRow>
            )}
            {paginated.map((r) => (
              <TableRow
                key={r.id}
                className="cursor-pointer"
                onClick={() => navigate(`/reglas-precio/${r.id}`)}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                <TableCell className="py-2.5 font-medium whitespace-normal">{r.name}</TableCell>
                <TableCell className="py-2.5 text-sm whitespace-normal text-muted-foreground">
                  {r.description || "—"}
                </TableCell>
                <TableCell className="text-sm whitespace-normal text-muted-foreground">
                  {formatDateTime(r.createdAt)}
                </TableCell>
                <TableCell className="text-sm whitespace-normal text-muted-foreground">
                  {formatDate(r.fromDate)} – {formatDate(r.thruDate)}
                </TableCell>
                <TableCell>{OUTCOME_MODE_LABELS[r.outcomeMode]}</TableCell>
                <TableCell className="text-sm whitespace-normal text-muted-foreground">
                  {OUTCOME_TYPE_LABELS[r.outcomeType]}
                </TableCell>
                <TableCell>
                  <ApprovalStatusBadge status={r.approvalStatus} />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()} className="text-center">
                  <StatusDot status={r.status} />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="Acciones">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/reglas-precio/${r.id}`)}>
                        <Eye /> Ver detalle
                      </DropdownMenuItem>
                      {can("price_rules.edit") && r.approvalStatus !== "APPROVED" && (
                        <DropdownMenuItem onClick={() => navigate(`/reglas-precio/${r.id}/editar`)}>
                          <Pencil /> Editar
                        </DropdownMenuItem>
                      )}
                      {can("price_rules.duplicate") && (
                        <DropdownMenuItem
                          onClick={() => {
                            duplicateRule(r.id)
                            resetPage()
                          }}
                        >
                          <Copy /> Duplicar
                        </DropdownMenuItem>
                      )}
                      {can("price_rules.approve") && r.approvalStatus === "WAITING_COMMERCIAL_APPROVAL" && (
                        <DropdownMenuItem onClick={() => setApprovalTarget(r)}>
                          <CheckCircle2 /> Aprobar / Rechazar
                        </DropdownMenuItem>
                      )}
                      {can("price_rules.toggle_status") && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={r.approvalStatus !== "APPROVED"}
                            onClick={() => toggleEnabled(r.id)}
                          >
                            {r.status === "ENABLE" ? (
                              <>
                                <PowerOff /> Desactivar
                              </>
                            ) : (
                              <>
                                <Power /> Activar
                              </>
                            )}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-wrap items-center justify-center gap-1 border-t px-4 py-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setCurrentPage(page - 1)}
            className="gap-1"
          >
            <ChevronLeft /> Anterior
          </Button>
          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${i}`}
                className="px-1.5 text-sm text-muted-foreground select-none"
              >
                …
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                className="w-8 px-0"
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setCurrentPage(page + 1)}
            className="gap-1"
          >
            Siguiente <ChevronRight />
          </Button>
        </div>
      </Card>

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

      <BulkUploadDialog open={bulkUploadOpen} onOpenChange={setBulkUploadOpen} />
    </div>
  )
}
