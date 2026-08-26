import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AlertTriangle, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/app/auth"
import { usePriceRules } from "../store"
import { CatalogCombobox, CatalogMultiSelect } from "../components/CatalogCombobox"
import { CriteriaRowsPanel, SpecificRowsPanel } from "../components/CriteriaRowsPanel"
import { ScaleEditor } from "../components/ScaleEditor"
import {
  COMPANY_LABELS,
  OUTCOME_TYPE_LABELS,
  RULE_TYPE_LABELS,
  TARGET_LABELS,
} from "../labels"
import {
  emptyRule,
  type Company,
  type OutcomeMode,
  type OutcomeType,
  type OptionalProductRow,
  type PaymentCondition,
  type RuleType,
  type TargetEnum,
} from "../types"
import {
  DISTRIBUTORS,
  OWNERS,
  CUSTOMERS,
  SALE_CHANNELS,
  SECTORS,
  ROUTES,
  DIVISIONS,
  BRANDS,
  CATEGORIES,
  FAMILIES,
  SUB_FAMILIES,
  PRODUCTS,
  WAREHOUSES,
  ROLE_TYPES,
  UNITS,
} from "../data/catalogs"

const OUTCOME_MODES: { value: OutcomeMode; label: string; hint: string }[] = [
  { value: "SINGLE", label: "Tradicional", hint: "Un solo valor de resultado." },
  { value: "SCALE", label: "Escala", hint: "El resultado depende de un rango (cantidad o monto)." },
  { value: "FREQUENCY", label: "Frecuencia", hint: "El resultado se repite cada N unidades/monto." },
]

const CRITERIA_ELEMENTS = [
  { value: "PROPIETARIO" as const, label: "Propietario", catalog: OWNERS },
  { value: "CLIENTE" as const, label: "Cliente", catalog: CUSTOMERS },
  { value: "CANAL_VENTA" as const, label: "Canal de venta", catalog: SALE_CHANNELS },
  { value: "SECTOR" as const, label: "Sector", catalog: SECTORS },
  { value: "RUTA" as const, label: "Ruta", catalog: ROUTES },
]

const SPECIFIC_ELEMENTS = [
  { value: "DIVISION" as const, label: "División", catalog: DIVISIONS },
  { value: "MARCA" as const, label: "Marca", catalog: BRANDS },
  { value: "CATEGORIA" as const, label: "Categoría", catalog: CATEGORIES },
  { value: "FAMILIA" as const, label: "Familia", catalog: FAMILIES },
  { value: "SUB_FAMILIA" as const, label: "Sub-Familia", catalog: SUB_FAMILIES },
  { value: "PRODUCTO" as const, label: "Producto", catalog: PRODUCTS },
]

// key={id} fuerza un remount al navegar entre /editar de distintas reglas (p. ej. tras Duplicar) —
// sin esto React reutiliza la instancia y el useState de más abajo se queda con los datos viejos.
export function PriceRuleFormPage() {
  const { id } = useParams()
  return <PriceRuleFormInner key={id ?? "new"} />
}

function PriceRuleFormInner() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { getRule, createRule, updateRule, duplicateRule } = usePriceRules()
  const { can } = useAuth()

  const existing = isEdit ? getRule(Number(id)) : undefined
  const [data, setData] = useState(() =>
    existing ? { ...existing } : { ...emptyRule() }
  )
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [optionalModalOpen, setOptionalModalOpen] = useState(false)

  // Tu rol no puede crear/editar reglas — ej. Gerente Comercial solo aprueba y activa/desactiva.
  if ((!isEdit && !can("price_rules.create")) || (isEdit && !can("price_rules.edit"))) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft />
        </Button>
        <Card className="max-w-lg space-y-3 p-6">
          <h1 className="text-lg font-semibold">No tenés permiso para esto</h1>
          <p className="text-sm text-muted-foreground">
            Tu rol actual no puede {isEdit ? "editar" : "crear"} reglas de precio. Cambiá al
            usuario Admin arriba para probar esta pantalla.
          </p>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" onClick={() => navigate("/reglas-precio")}>
              Volver al listado
            </Button>
            {isEdit && existing && (
              <Button onClick={() => navigate(`/reglas-precio/${existing.id}`)}>Ver detalle</Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  // Una regla APPROVED es de solo lectura salvo por su estado (activa/inactiva) — para cambiar
  // sus condiciones hay que duplicarla, no editarla en el lugar.
  if (isEdit && existing && existing.approvalStatus === "APPROVED") {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft />
        </Button>
        <Card className="max-w-lg space-y-3 p-6">
          <h1 className="text-lg font-semibold">Esta regla ya está aprobada</h1>
          <p className="text-sm text-muted-foreground">
            No se puede editar una regla aprobada — solo activarla o desactivarla. Para modificar
            sus condiciones, duplicala: se crea una copia editable que vuelve a pasar por
            aprobación comercial.
          </p>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" onClick={() => navigate(`/reglas-precio/${existing.id}`)}>
              Ver detalle
            </Button>
            <Button onClick={() => duplicateRule(existing.id)}>Duplicar</Button>
          </div>
        </Card>
      </div>
    )
  }

  // Bloqueo progresivo de Empresa una vez definidos Criterios Específicos o Resultado
  // (ESPECIFICACION-UI-CAPTURADA.md §2, Cabecera).
  const companyLocked =
    data.specificRows.length > 0 || Boolean(data.value) || (data.scales?.length ?? 0) > 0

  const showProductTargetWarning = data.target === "PRODUCT" && data.specificRows.length === 0

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    if (isEdit && existing) {
      updateRule(existing.id, data)
      navigate(`/reglas-precio/${existing.id}`)
    } else {
      const created = createRule(data)
      navigate(`/reglas-precio/${created.id}`)
    }
    setConfirmOpen(false)
  }

  const canSubmit =
    data.name.trim().length > 0 && data.fromDate.trim().length > 0 && data.thruDate.trim().length > 0

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? `Editar Regla #${id}` : "Nueva Regla de Precio"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Los campos marcados con * son obligatorios.
          </p>
        </div>
      </div>

      {/* Cabecera */}
      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Datos Generales</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Empresa *</Label>
            <Select
              value={data.company}
              disabled={companyLocked}
              onValueChange={(v) => set("company", v as Company)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(COMPANY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {companyLocked && (
              <p className="text-xs text-muted-foreground">
                No se puede cambiar una vez definidos Criterios Específicos o Resultado.
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="name">Nombre * (máx. 100)</Label>
            <Input
              id="name"
              maxLength={100}
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="description">Descripción (máx. 255)</Label>
            <Textarea
              id="description"
              maxLength={255}
              value={data.description}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fromDate">Desde *</Label>
            <Input
              id="fromDate"
              type="date"
              value={data.fromDate}
              onChange={(e) => set("fromDate", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="thruDate">Hasta *</Label>
            <Input
              id="thruDate"
              type="date"
              value={data.thruDate}
              onChange={(e) => set("thruDate", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Toda regla tiene una fecha de fin — la vigencia no puede quedar abierta.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Tipo de Regla *</Label>
          <div className="flex flex-wrap gap-2">
            {OUTCOME_MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => set("outcomeMode", m.value)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  data.outcomeMode === m.value
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
              >
                <div className="font-medium">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.hint}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="applyOnce"
            checked={data.applyOnlyOnce}
            onCheckedChange={(c) => set("applyOnlyOnce", c === true)}
          />
          <Label htmlFor="applyOnce" className="font-normal">
            Aplicar una sola vez por cliente
          </Label>
        </div>
      </Card>

      {/* Criterios Generales */}
      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Criterios Generales</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Distribuidora</Label>
            <CatalogMultiSelect
              items={DISTRIBUTORS}
              selectedIds={data.distributorIds}
              onChange={(ids) => set("distributorIds", ids)}
              placeholder="Todas las distribuidoras"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Almacenes</Label>
            <CatalogMultiSelect
              items={WAREHOUSES}
              selectedIds={data.warehouseIds}
              onChange={(ids) => set("warehouseIds", ids)}
              placeholder="Todos los almacenes"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Roles</Label>
            <div className="flex flex-wrap gap-3 pt-1.5">
              {ROLE_TYPES.map((role) => (
                <div key={role.id} className="flex items-center gap-1.5">
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={data.roleTypes.includes(role.code)}
                    onCheckedChange={(c) =>
                      set(
                        "roleTypes",
                        c === true
                          ? [...data.roleTypes, role.code]
                          : data.roleTypes.filter((r) => r !== role.code)
                      )
                    }
                  />
                  <Label htmlFor={`role-${role.id}`} className="font-normal">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Condición de Pago</Label>
            <Select
              value={data.paymentCondition}
              onValueChange={(v) => set("paymentCondition", v as PaymentCondition)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos</SelectItem>
                <SelectItem value="CASH">Contado</SelectItem>
                <SelectItem value="CREDIT">Crédito</SelectItem>
                <SelectItem value="CREDIT_ON_DELIVERY">Pronto Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Criterios de la Regla */}
      <Card className="space-y-4 p-5">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">Criterios de la Regla</h2>
          <p className="text-xs text-muted-foreground">A quién se le aplica esta regla.</p>
        </div>
        <CriteriaRowsPanel
          rows={data.criteriaRows}
          onChange={(rows) => set("criteriaRows", rows)}
          elements={CRITERIA_ELEMENTS}
          hasDistributor={data.distributorIds.length > 0}
        />
      </Card>

      {/* Criterios Específicos */}
      <Card className="space-y-4 p-5">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">Criterios Específicos</h2>
          <p className="text-xs text-muted-foreground">Sobre qué producto aplica esta regla.</p>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="useSaleOrderTotal"
            checked={data.useSaleOrderTotalForOutcome}
            onCheckedChange={(c) => set("useSaleOrderTotalForOutcome", c === true)}
          />
          <Label htmlFor="useSaleOrderTotal" className="font-normal">
            Usar el valor de la compra actual
          </Label>
        </div>

        <div className="space-y-1.5">
          <Label>Tipo de Resolución</Label>
          <div className="flex gap-2">
            {(["RESTRICTED", "GENERAL"] as RuleType[]).map((rt) => (
              <Button
                key={rt}
                type="button"
                size="sm"
                variant={data.ruleType === rt ? "default" : "outline"}
                onClick={() => set("ruleType", rt)}
              >
                {RULE_TYPE_LABELS[rt]}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.ruleType === "RESTRICTED"
              ? "Deben calzar todos los sujetos cargados abajo (el más estricto)."
              : "Basta con que uno de los sujetos cargados abajo calce."}
          </p>
        </div>

        <SpecificRowsPanel
          rows={data.specificRows}
          onChange={(rows) => set("specificRows", rows)}
          elements={SPECIFIC_ELEMENTS}
        />
      </Card>

      {/* Configuración del Resultado Esperado */}
      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Configuración del Resultado Esperado
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Objetivo</Label>
            <Select value={data.target} onValueChange={(v) => set("target", v as TargetEnum)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TARGET_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showProductTargetWarning && (
              <p className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                <AlertTriangle className="size-3.5" /> No hay Criterios Específicos cargados — el
                resultado no tiene sobre qué producto aplicarse.
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Tipo de Resultado *</Label>
            <Select
              value={data.outcomeType}
              onValueChange={(v) => set("outcomeType", v as OutcomeType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(OUTCOME_TYPE_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {data.outcomeMode === "SCALE" && (
          <ScaleEditor
            scaleType={data.scaleType ?? "QUANTITY"}
            onScaleTypeChange={(t) => set("scaleType", t)}
            scales={data.scales ?? []}
            onChange={(scales) => set("scales", scales)}
          />
        )}

        {data.outcomeMode === "FREQUENCY" && (
          <div className="max-w-xs space-y-1.5">
            <Label htmlFor="frequency">Frecuencia</Label>
            <Input
              id="frequency"
              type="number"
              min={1}
              value={data.frequency ?? ""}
              onChange={(e) => set("frequency", e.target.value ? Number(e.target.value) : undefined)}
            />
            <p className="text-xs text-muted-foreground">
              Cada N unidades/monto se dispara el resultado (división entera hacia abajo).
            </p>
          </div>
        )}

        {data.outcomeType === "PRODUCT" ? (
          <BonusProductSection
            bonusProduct={data.bonusProduct}
            onChange={(bp) => set("bonusProduct", bp)}
            optionalProducts={data.optionalProducts ?? []}
            onOptionalProductsChange={(rows) => set("optionalProducts", rows)}
            optionalModalOpen={optionalModalOpen}
            setOptionalModalOpen={setOptionalModalOpen}
          />
        ) : data.outcomeMode === "SINGLE" ? (
          <div className="max-w-xs space-y-1.5">
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={data.value ?? ""}
              onChange={(e) => set("value", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        ) : null}
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
        <Button disabled={!canSubmit} onClick={() => setConfirmOpen(true)}>
          Guardar
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar</DialogTitle>
            <DialogDescription>
              {isEdit
                ? `Vas a guardar los cambios de "${data.name}".`
                : `Vas a crear la regla "${data.name}". Quedará pendiente de aprobación comercial.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Seguir editando
            </Button>
            <Button onClick={handleSave}>Confirmar y guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BonusProductSection({
  bonusProduct,
  onChange,
  optionalProducts,
  onOptionalProductsChange,
  optionalModalOpen,
  setOptionalModalOpen,
}: {
  bonusProduct: { code: string; name: string; unit: string; qty: number } | undefined
  onChange: (bp: { code: string; name: string; unit: string; qty: number }) => void
  optionalProducts: OptionalProductRow[]
  onOptionalProductsChange: (rows: OptionalProductRow[]) => void
  optionalModalOpen: boolean
  setOptionalModalOpen: (open: boolean) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Producto</Label>
          <CatalogCombobox
            items={PRODUCTS}
            placeholder={bonusProduct ? bonusProduct.name : "Buscar producto…"}
            onSelect={(item) =>
              onChange({
                code: item.code,
                name: item.name,
                unit: bonusProduct?.unit ?? "UN",
                qty: bonusProduct?.qty ?? 1,
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label>Cantidad</Label>
          <Input
            type="number"
            min={1}
            value={bonusProduct?.qty ?? 1}
            onChange={(e) =>
              onChange({
                code: bonusProduct?.code ?? "",
                name: bonusProduct?.name ?? "",
                unit: bonusProduct?.unit ?? "UN",
                qty: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-sm">Productos Opcionales</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => setOptionalModalOpen(true)} className="gap-1.5">
          <Plus /> Agregar producto opcional
        </Button>
      </div>

      {optionalProducts.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {optionalProducts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-muted-foreground">{row.unit}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        onOptionalProductsChange(optionalProducts.filter((r) => r.id !== row.id))
                      }
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

      <OptionalProductDialog
        open={optionalModalOpen}
        onOpenChange={setOptionalModalOpen}
        onAdd={(row) => onOptionalProductsChange([...optionalProducts, row])}
      />
    </div>
  )
}

function OptionalProductDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (row: OptionalProductRow) => void
}) {
  const [product, setProduct] = useState<{ code: string; name: string } | null>(null)
  const [unit, setUnit] = useState("UN")
  const [qty, setQty] = useState("1")

  const canAdd = product !== null && Number(qty) > 0

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o)
        if (!o) {
          setProduct(null)
          setUnit("UN")
          setQty("1")
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar producto opcional</DialogTitle>
          <DialogDescription>
            Equivalencia intercambiable por el producto de regalo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Producto</Label>
            <CatalogCombobox
              items={PRODUCTS}
              placeholder={product ? product.name : "Buscar producto…"}
              onSelect={(item) => setProduct({ code: item.code, name: item.name })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Unidad de Medida</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u.id} value={u.code}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Cantidad</Label>
              <Input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            disabled={!canAdd}
            onClick={() => {
              if (!product) return
              onAdd({
                id: crypto.randomUUID(),
                code: product.code,
                name: product.name,
                unit,
                qty: Number(qty),
              })
              onOpenChange(false)
            }}
          >
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
