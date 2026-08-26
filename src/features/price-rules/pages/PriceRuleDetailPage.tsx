import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, CheckCircle2, Copy, Pencil, Power, PowerOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from "@/app/auth"
import { usePriceRules } from "../store"
import { ApprovalStatusBadge, RuleStatusBadge } from "../components/RuleStatusBadge"
import { ApprovalDialog } from "../components/ApprovalDialog"
import {
  COMPANY_LABELS,
  CRITERIA_ELEMENT_LABELS,
  EXCLUSIVE_OUTCOME_LABELS,
  OUTCOME_MODE_LABELS,
  OUTCOME_TYPE_LABELS,
  PAYMENT_CONDITION_LABELS,
  RULE_TYPE_LABELS,
  SCALE_TYPE_LABELS,
  SPECIFIC_ELEMENT_LABELS,
  TARGET_LABELS,
  formatDate,
  formatDateTime,
} from "../labels"
import { DISTRIBUTORS, ROLE_TYPES, WAREHOUSES, findById } from "../data/catalogs"

export function PriceRuleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRule, approveRule, rejectRule, toggleEnabled, duplicateRule } = usePriceRules()
  const { can } = useAuth()
  const rule = getRule(Number(id))
  const [approvalOpen, setApprovalOpen] = useState(false)

  if (!rule) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">No se encontró la regla #{id}.</p>
        <Button asChild variant="outline">
          <Link to="/reglas-precio">Volver al listado</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="mt-1"
            onClick={() => navigate("/reglas-precio")}
            aria-label="Volver"
          >
            <ArrowLeft />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{rule.name}</h1>
              <span className="font-mono text-sm text-muted-foreground">#{rule.id}</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <RuleStatusBadge status={rule.status} />
              <ApprovalStatusBadge status={rule.approvalStatus} />
            </div>
            {rule.approvalStatus === "APPROVED" && (
              <p className="mt-1 text-xs text-muted-foreground">
                {can("price_rules.duplicate")
                  ? "Ya está aprobada — para modificar sus condiciones, duplicala. Solo se puede cambiar si está activa o inactiva."
                  : "Ya está aprobada — solo se puede cambiar si está activa o inactiva."}
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          {can("price_rules.approve") && rule.approvalStatus === "WAITING_COMMERCIAL_APPROVAL" && (
            <Button variant="outline" className="gap-1.5" onClick={() => setApprovalOpen(true)}>
              <CheckCircle2 /> Aprobar / Rechazar
            </Button>
          )}
          {can("price_rules.toggle_status") && rule.approvalStatus === "APPROVED" && (
            <Button variant="outline" className="gap-1.5" onClick={() => toggleEnabled(rule.id)}>
              {rule.status === "ENABLE" ? (
                <>
                  <PowerOff /> Desactivar
                </>
              ) : (
                <>
                  <Power /> Activar
                </>
              )}
            </Button>
          )}
          {can("price_rules.duplicate") && (
            <Button variant="outline" className="gap-1.5" onClick={() => duplicateRule(rule.id)}>
              <Copy /> Duplicar
            </Button>
          )}
          {can("price_rules.edit") && rule.approvalStatus !== "APPROVED" && (
            <Button asChild className="gap-1.5">
              <Link to={`/reglas-precio/${rule.id}/editar`}>
                <Pencil /> Editar
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Datos Generales</h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <Field label="Empresa" value={COMPANY_LABELS[rule.company]} />
          <Field label="Tipo de Regla" value={OUTCOME_MODE_LABELS[rule.outcomeMode]} />
          <Field
            label="Vigencia"
            value={`${formatDate(rule.fromDate)} – ${formatDate(rule.thruDate)}`}
          />
          <Field label="Aplicar una sola vez" value={rule.applyOnlyOnce ? "Sí" : "No"} />
          <Field label="Aplicación" value={EXCLUSIVE_OUTCOME_LABELS[rule.exclusiveOutcome]} />
          <Field label="Creado por" value={rule.createdBy} />
          <div className="sm:col-span-3">
            <dt className="text-xs text-muted-foreground">Descripción</dt>
            <dd>{rule.description || "—"}</dd>
          </div>
        </dl>
      </Card>

      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Criterios Generales</h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Field
            label="Distribuidora"
            value={
              rule.distributorIds.length === 0
                ? "Todas"
                : rule.distributorIds
                    .map((i) => findById(DISTRIBUTORS, i)?.name)
                    .filter(Boolean)
                    .join(", ")
            }
          />
          <Field
            label="Almacenes"
            value={
              rule.warehouseIds.length === 0
                ? "Todos"
                : rule.warehouseIds
                    .map((i) => findById(WAREHOUSES, i)?.name)
                    .filter(Boolean)
                    .join(", ")
            }
          />
          <Field
            label="Roles"
            value={
              rule.roleTypes.length === 0
                ? "Todos"
                : rule.roleTypes
                    .map((code) => ROLE_TYPES.find((r) => r.code === code)?.name)
                    .filter(Boolean)
                    .join(", ")
            }
          />
          <Field label="Condición de Pago" value={PAYMENT_CONDITION_LABELS[rule.paymentCondition]} />
        </dl>
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Criterios de la Regla (el "quién")
        </h2>
        <RowsTable
          rows={rule.criteriaRows}
          typeLabel={(t) => CRITERIA_ELEMENT_LABELS[t as keyof typeof CRITERIA_ELEMENT_LABELS]}
          emptyText="Universal — sin restricción, aplica a todos."
        />
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Criterios Específicos (el "sobre qué producto")
        </h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Field label="Tipo de Resolución" value={RULE_TYPE_LABELS[rule.ruleType]} />
          <Field
            label="Usar valor de compra actual"
            value={rule.useSaleOrderTotalForOutcome ? "Sí" : "No"}
          />
        </dl>
        <RowsTable
          rows={rule.specificRows}
          typeLabel={(t) => SPECIFIC_ELEMENT_LABELS[t as keyof typeof SPECIFIC_ELEMENT_LABELS]}
          emptyText="Universal — sin restricción, aplica a todos los productos."
          showUnit
        />
      </Card>

      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Configuración del Resultado Esperado
        </h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <Field label="Objetivo" value={TARGET_LABELS[rule.target]} />
          <Field label="Tipo de Resultado" value={OUTCOME_TYPE_LABELS[rule.outcomeType]} />
          {rule.outcomeMode === "SINGLE" && rule.outcomeType !== "PRODUCT" && (
            <Field label="Valor" value={String(rule.value ?? "—")} />
          )}
          {rule.outcomeMode === "FREQUENCY" && (
            <Field label="Frecuencia" value={String(rule.frequency ?? "—")} />
          )}
          {rule.outcomeMode === "SCALE" && (
            <Field label="Tipo de Validación" value={SCALE_TYPE_LABELS[rule.scaleType ?? "QUANTITY"]} />
          )}
        </dl>

        {rule.outcomeMode === "SCALE" && rule.scales && rule.scales.length > 0 && (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Desde</TableHead>
                  <TableHead>Hasta</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...rule.scales]
                  .sort((a, b) => a.from - b.from)
                  .map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.from}</TableCell>
                      <TableCell>{s.to ?? "Sin límite"}</TableCell>
                      <TableCell>{s.value}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}

        {rule.outcomeType === "PRODUCT" && rule.bonusProduct && (
          <>
            <Separator />
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
              <Field label="Producto de bonificación" value={rule.bonusProduct.name} />
              <Field label="Unidad de Medida" value={rule.bonusProduct.unit} />
              <Field label="Cantidad" value={String(rule.bonusProduct.qty)} />
            </dl>
            {rule.optionalProducts && rule.optionalProducts.length > 0 && (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto opcional (equivalente)</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rule.optionalProducts.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="text-muted-foreground">{row.unit}</TableCell>
                        <TableCell>{row.qty}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </Card>

      <p className="text-xs text-muted-foreground">
        Creada el {formatDateTime(rule.createdAt)} · Última actualización: {formatDateTime(rule.updatedAt)}
      </p>

      <ApprovalDialog
        rule={rule}
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        onApprove={(exclusive) => {
          approveRule(rule.id, exclusive)
          setApprovalOpen(false)
        }}
        onReject={() => {
          rejectRule(rule.id)
          setApprovalOpen(false)
        }}
      />
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}

function RowsTable({
  rows,
  typeLabel,
  emptyText,
  showUnit,
}: {
  rows: { id: string; type: string; code: string; name: string; unit?: string }[]
  typeLabel: (type: string) => string
  emptyText: string
  showUnit?: boolean
}) {
  if (rows.length === 0) {
    return <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">{emptyText}</p>
  }
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            {showUnit && <TableHead>Unidad</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="text-muted-foreground">{typeLabel(row.type)}</TableCell>
              <TableCell className="font-mono text-xs">{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              {showUnit && <TableCell className="text-muted-foreground">{row.unit ?? "—"}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
