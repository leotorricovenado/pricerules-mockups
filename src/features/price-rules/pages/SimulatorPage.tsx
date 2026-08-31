import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Info, Play, Search, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { usePriceRules } from "../store"
import { ApprovalStatusBadge, RuleStatusBadge } from "../components/RuleStatusBadge"
import { CatalogCombobox } from "../components/CatalogCombobox"
import { runSimulation } from "../simulator/engine"
import type { TestCustomer, TestOrder, TestOrderLine, TieBreakFlags } from "../simulator/types"
import { DEFAULT_TIE_BREAK_FLAGS } from "../simulator/types"
import type { SimulationResult, LineSimulationResult, OrderLevelSimulationResult } from "../simulator/types"
import { OUTCOME_TYPE_LABELS } from "../labels"
import { toISODate } from "@/lib/date"
import {
  CUSTOMERS,
  DISTRIBUTORS,
  OWNERS,
  PRODUCTS,
  ROUTES,
  SALE_CHANNELS,
  SELLERS,
  SUB_SALE_CHANNELS,
  WAREHOUSES,
  findById,
  type ProductCatalogItem,
} from "../data/catalogs"
import type { ApprovalStatus, RuleStatus } from "../types"

// Pantalla nueva `/reglas-precio/simulador` — CLAUDE.md §29, caso de uso B ("Competencia entre
// varias": elegir un conjunto de reglas y correr un pedido de prueba contra la misma resolución de
// canastas de §27). Los casos A ("Probar esta regla" dentro del form) y C ("Ver impacto" en el
// modal de aprobación) quedan fuera de esta primera implementación — no se pidieron todavía.

const PAYMENT_OPTIONS: { value: TestOrder["paymentCondition"]; label: string }[] = [
  { value: "CASH", label: "Contado" },
  { value: "CREDIT", label: "Crédito" },
  { value: "CREDIT_ON_DELIVERY", label: "Pronto Pago" },
]

const TIE_BREAK_SWITCHES: { key: keyof TieBreakFlags; label: string; hint: string }[] = [
  { key: "DISCOUNT_PERCENTAGE", label: "Descuento %", hint: "PRICING_GIVE_THE_GREATER_DISCOUNT" },
  { key: "DISCOUNT_AMOUNT", label: "Descuento por monto", hint: "mismo flag que descuento % en el legacy" },
  { key: "FIXED_PRICE", label: "Precio fijo", hint: "PRICING_GIVE_THE_GREATER_FIXED_PRICE" },
  { key: "PRODUCT", label: "Bonificación de productos", hint: "PRICING_GIVE_THE_GREATER_BONUS_PRODUCT" },
  { key: "PRODUCT_SURCHARGE", label: "Recargo por producto", hint: "PRICING_GIVE_THE_GREATER_SURCHARGE_PRODUCT" },
]

// Default de "todas las activas" — CLAUDE.md §29 decisión 1: incluye pendientes de aprobación
// (el caso de uso principal es previsualizar ANTES de aprobar), excluye Rechazadas y reglas
// desactivadas a mano aunque estén Aprobadas.
function isDefaultSelected(status: RuleStatus, approvalStatus: ApprovalStatus): boolean {
  if (approvalStatus === "WAITING_COMMERCIAL_APPROVAL" || approvalStatus === "WAITING_MANAGEMENT_APPROVAL") return true
  return status === "ENABLE" && approvalStatus === "APPROVED"
}

function emptyTestOrder(): TestOrder {
  return {
    orderDate: toISODate(new Date()),
    distributorId: null,
    warehouseId: null,
    paymentCondition: "CASH",
    customer: { mode: "GENERIC" },
    lines: [],
    accumulatedPurchases: undefined,
  }
}

export function SimulatorPage() {
  const navigate = useNavigate()
  const { rules } = usePriceRules()

  const [ruleSearch, setRuleSearch] = useState("")
  const [selectedRuleIds, setSelectedRuleIds] = useState<Set<number>>(
    () => new Set(rules.filter((r) => isDefaultSelected(r.status, r.approvalStatus)).map((r) => r.id))
  )
  const [flags, setFlags] = useState<TieBreakFlags>(DEFAULT_TIE_BREAK_FLAGS)
  const [order, setOrder] = useState<TestOrder>(emptyTestOrder)
  const [pendingProduct, setPendingProduct] = useState<ProductCatalogItem | null>(null)
  const [result, setResult] = useState<SimulationResult | null>(null)

  const visibleRules = useMemo(() => {
    const q = ruleSearch.trim().toLowerCase()
    if (!q) return rules
    return rules.filter((r) => r.name.toLowerCase().includes(q) || String(r.id).includes(q))
  }, [rules, ruleSearch])

  function toggleRule(id: number) {
    setSelectedRuleIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function updateCustomer(patch: Partial<TestCustomer>) {
    setOrder((prev) => ({ ...prev, customer: { ...prev.customer, ...patch } }))
  }

  function addLine(product: ProductCatalogItem) {
    const line: TestOrderLine = {
      id: crypto.randomUUID(),
      productId: product.id,
      quantity: 1,
      unitPrice: product.referencePrice,
    }
    setOrder((prev) => ({ ...prev, lines: [...prev.lines, line] }))
    setPendingProduct(null)
  }

  function updateLine(id: string, patch: Partial<TestOrderLine>) {
    setOrder((prev) => ({
      ...prev,
      lines: prev.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }))
  }

  function removeLine(id: string) {
    setOrder((prev) => ({ ...prev, lines: prev.lines.filter((l) => l.id !== id) }))
  }

  function simulate() {
    const selected = rules.filter((r) => selectedRuleIds.has(r.id))
    setResult(runSimulation(selected, order, flags))
  }

  const canSimulate = order.lines.length > 0 && selectedRuleIds.size > 0

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon-sm" className="mt-1" onClick={() => navigate("/reglas-precio")} aria-label="Volver">
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Simulador de Reglas de Precio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Armá un pedido de prueba y elegí qué reglas compiten — mismo motor de resolución de canastas que produccion
            (CLAUDE.md §27/§29), corrido en memoria sobre datos del mockup.
          </p>
        </div>
      </div>

      {/* Reglas a simular */}
      <Card className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Reglas a simular ({selectedRuleIds.size} de {rules.length})
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRuleIds(new Set(rules.filter((r) => isDefaultSelected(r.status, r.approvalStatus)).map((r) => r.id)))}
            >
              Activas + pendientes
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedRuleIds(new Set())}>
              Ninguna
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Por defecto vienen marcadas las Activas/Aprobadas y las pendientes de aprobación — el caso de uso principal es
          previsualizar el efecto de una regla ANTES de aprobarla (CLAUDE.md §29, decisión 1).
        </p>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por nombre o #id…" value={ruleSearch} onChange={(e) => setRuleSearch(e.target.value)} className="pl-8" />
        </div>
        <ScrollArea className="h-64 rounded-lg border">
          <div className="divide-y">
            {visibleRules.map((r) => (
              <label key={r.id} className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-muted/50">
                <Checkbox checked={selectedRuleIds.has(r.id)} onCheckedChange={() => toggleRule(r.id)} />
                <span className="font-mono text-xs text-muted-foreground">#{r.id}</span>
                <span className="flex-1 truncate text-sm">{r.name}</span>
                <Badge variant="outline" className="hidden shrink-0 sm:inline-flex">
                  {OUTCOME_TYPE_LABELS[r.outcomeType]}
                </Badge>
                <RuleStatusBadge status={r.status} />
                <ApprovalStatusBadge status={r.approvalStatus} />
              </label>
            ))}
            {visibleRules.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">Sin resultados.</p>}
          </div>
        </ScrollArea>
      </Card>

      {/* Configuración de desempate */}
      <Card className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">Configuración de desempate</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Las 6 banderas GIVE_THE_GREATER_* (CLAUDE.md §9/§28). Hoy en producción las 6 están en "false" — acá se
              pueden tocar solo para esta simulación, todavía no persisten (eso es el futuro endpoint
              GET/PUT /price-rules/settings de §28).
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TIE_BREAK_SWITCHES.map((s) => (
            <div key={s.key} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{flags[s.key] ? "Favorece al cliente" : "Favorece a la empresa (hoy)"}</p>
              </div>
              <Switch
                checked={flags[s.key]}
                onCheckedChange={(checked) => setFlags((prev) => ({ ...prev, [s.key]: checked }))}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Pedido de prueba */}
      <Card className="space-y-4 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Pedido de prueba</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label>Fecha del pedido</Label>
            <Input type="date" value={order.orderDate} onChange={(e) => setOrder((p) => ({ ...p, orderDate: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label>Distribuidora</Label>
            <Select
              value={order.distributorId != null ? String(order.distributorId) : ""}
              onValueChange={(v) => setOrder((p) => ({ ...p, distributorId: Number(v) }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elegir…" />
              </SelectTrigger>
              <SelectContent>
                {DISTRIBUTORS.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Almacén</Label>
            <Select
              value={order.warehouseId != null ? String(order.warehouseId) : ""}
              onValueChange={(v) => setOrder((p) => ({ ...p, warehouseId: Number(v) }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elegir…" />
              </SelectTrigger>
              <SelectContent>
                {WAREHOUSES.map((w) => (
                  <SelectItem key={w.id} value={String(w.id)}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Condición de pago</Label>
            <Select value={order.paymentCondition} onValueChange={(v) => setOrder((p) => ({ ...p, paymentCondition: v as TestOrder["paymentCondition"] }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Cliente</Label>
            <div className="flex rounded-md border p-0.5 text-xs">
              <button
                type="button"
                onClick={() => updateCustomer({ mode: "GENERIC" })}
                className={`rounded px-2 py-1 ${order.customer.mode === "GENERIC" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                Genérico
              </button>
              <button
                type="button"
                onClick={() => updateCustomer({ mode: "REAL" })}
                className={`rounded px-2 py-1 ${order.customer.mode === "REAL" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                Cliente real
              </button>
            </div>
          </div>

          {order.customer.mode === "REAL" && (
            <div className="max-w-sm space-y-1.5">
              <Label className="text-xs text-muted-foreground">Cliente</Label>
              <CatalogCombobox
                items={CUSTOMERS}
                onSelect={(item) => updateCustomer({ realCustomerId: item.id })}
                placeholder={
                  order.customer.realCustomerId != null
                    ? findById(CUSTOMERS, order.customer.realCustomerId)?.name
                    : "Buscar cliente…"
                }
              />
              <p className="text-xs text-muted-foreground">
                Permite ver el candado de "aplicar solo una vez" como dato informativo (CLAUDE.md §29, decisión 2) — en
                este mockup el candado no está simulado todavía (no hay historial de price_rule_customer_applied).
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Propietario</Label>
              <Select value={order.customer.ownerId != null ? String(order.customer.ownerId) : ""} onValueChange={(v) => updateCustomer({ ownerId: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {OWNERS.map((o) => (
                    <SelectItem key={o.id} value={String(o.id)}>
                      {o.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Canal de venta</Label>
              <Select value={order.customer.saleChannelId != null ? String(order.customer.saleChannelId) : ""} onValueChange={(v) => updateCustomer({ saleChannelId: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {SALE_CHANNELS.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Subcanal</Label>
              <Select value={order.customer.subSaleChannelId != null ? String(order.customer.subSaleChannelId) : ""} onValueChange={(v) => updateCustomer({ subSaleChannelId: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {SUB_SALE_CHANNELS.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Ruta</Label>
              <Select value={order.customer.routeId != null ? String(order.customer.routeId) : ""} onValueChange={(v) => updateCustomer({ routeId: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {ROUTES.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Vendedor</Label>
              <Select value={order.customer.sellerId != null ? String(order.customer.sellerId) : ""} onValueChange={(v) => updateCustomer({ sellerId: Number(v) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {SELLERS.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Compras acumuladas del Dueño (Bs)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Solo relevante para reglas outcomeMode "Acumulado" (CLAUDE.md §23). En producción esto lo entregaría
                Sales — acá se ingresa a mano porque el mockup no tiene ese servicio.
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            type="number"
            className="max-w-xs"
            value={order.accumulatedPurchases ?? ""}
            onChange={(e) => setOrder((p) => ({ ...p, accumulatedPurchases: e.target.value ? Number(e.target.value) : undefined }))}
            placeholder="0"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Líneas del pedido</Label>
          <div className="max-w-sm">
            <CatalogCombobox items={PRODUCTS} onSelect={addLine} placeholder="Agregar producto…" />
          </div>
          {order.lines.length > 0 && (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="w-28">Cantidad</TableHead>
                    <TableHead className="w-32">Precio Unit. (Bs)</TableHead>
                    <TableHead className="w-32">Subtotal</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.lines.map((line) => {
                    const product = findById(PRODUCTS, line.productId)
                    return (
                      <TableRow key={line.id}>
                        <TableCell>{product?.name ?? "—"}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={1}
                            value={line.quantity}
                            onChange={(e) => updateLine(line.id, { quantity: Math.max(1, Number(e.target.value)) })}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={0}
                            step="0.01"
                            value={line.unitPrice}
                            onChange={(e) => updateLine(line.id, { unitPrice: Math.max(0, Number(e.target.value)) })}
                          />
                        </TableCell>
                        <TableCell className="font-medium">Bs {(line.quantity * line.unitPrice).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon-sm" onClick={() => removeLine(line.id)} aria-label="Eliminar">
                            <Trash2 className="text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={simulate} disabled={!canSimulate} className="gap-1.5">
            <Play className="size-4" /> Simular
          </Button>
        </div>
      </Card>

      {result ? (
        <SimulationResultView result={result} />
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Play />
            </EmptyMedia>
            <EmptyTitle>Sin resultado todavía</EmptyTitle>
            <EmptyDescription>Armá el pedido de prueba y tocá "Simular" para ver cómo compiten las reglas elegidas.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  )
}

function SimulationResultView({ result }: { result: SimulationResult }) {
  return (
    <div className="space-y-4">
      <Card className="space-y-1 p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">Resumen</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Reglas consideradas" value={String(result.ruleCountConsidered)} />
          <Stat label="Reglas aplicables" value={String(result.ruleCountApplicable)} />
          <Stat label="Total sin reglas" value={`Bs ${result.grandTotalBefore.toFixed(2)}`} />
          <Stat label="Total final" value={`Bs ${result.grandTotalAfter.toFixed(2)}`} highlight />
        </div>
      </Card>

      {result.lines.map((line) => (
        <LineResultCard key={line.lineId} line={line} />
      ))}

      {result.orderLevel && <OrderLevelResultCard orderLevel={result.orderLevel} />}

      {result.notApplicableRuleIds.length > 0 && (
        <Card className="space-y-2 p-5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Reglas consideradas pero descartadas ({result.notApplicableRuleIds.length})
          </h2>
          <ul className="space-y-1 text-sm">
            {result.notApplicableRuleIds.map((r) => (
              <li key={r.ruleId} className="flex items-start gap-2">
                <span className="font-mono text-xs text-muted-foreground">#{r.ruleId}</span>
                <span className="text-muted-foreground">
                  {r.ruleName} — <span className="italic">{r.reason}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-semibold ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  )
}

function LineResultCard({ line }: { line: LineSimulationResult }) {
  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{line.productName}</h3>
          <p className="font-mono text-xs text-muted-foreground">{line.productCode}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {line.quantity} x Bs {line.unitPrice.toFixed(2)} = Bs {line.subtotal.toFixed(2)}
          </p>
          <p className="text-lg font-semibold">Bs {line.finalTotal.toFixed(2)}</p>
        </div>
      </div>
      {line.buckets.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ninguna regla seleccionada aplica a esta línea.</p>
      ) : (
        <div className="space-y-3">
          {line.buckets.map((bucket) => (
            <BucketView key={bucket.outcomeType} bucket={bucket} />
          ))}
        </div>
      )}
    </Card>
  )
}

function OrderLevelResultCard({ orderLevel }: { orderLevel: OrderLevelSimulationResult }) {
  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Nivel de pedido (target: Pedido de Venta)</h3>
          <p className="text-xs text-muted-foreground">
            Reglas con target "Pedido de Venta" se resuelven aparte, sobre el subtotal completo — CLAUDE.md §14 deja
            pendiente cómo interactúan exactamente con la competencia por línea en el motor real; acá se muestran como
            una competencia independiente.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Subtotal Bs {orderLevel.subtotal.toFixed(2)}</p>
          <p className="text-lg font-semibold">Bs {orderLevel.finalTotal.toFixed(2)}</p>
        </div>
      </div>
      <div className="space-y-3">
        {orderLevel.buckets.map((bucket) => (
          <BucketView key={bucket.outcomeType} bucket={bucket} />
        ))}
      </div>
    </Card>
  )
}

function BucketView({ bucket }: { bucket: import("../simulator/types").BucketResult }) {
  return (
    <div className="rounded-lg border">
      <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {OUTCOME_TYPE_LABELS[bucket.outcomeType]}
        </span>
        {bucket.blockedByExclusivity && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="border-destructive/50 text-destructive">
                Bloqueada
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Bloqueada por "{bucket.blockedByRuleName}" (No Acumulable — CLAUDE.md §27)</TooltipContent>
          </Tooltip>
        )}
      </div>
      <ul className="divide-y">
        {bucket.candidates.map((c) => (
          <li key={c.ruleId} className={`flex items-center justify-between gap-3 px-3 py-2 text-sm ${c.won && !bucket.blockedByExclusivity ? "bg-emerald-500/5" : ""}`}>
            <div className="flex items-center gap-2 truncate">
              {c.won && !bucket.blockedByExclusivity ? (
                <Badge className="shrink-0 bg-emerald-600 text-white hover:bg-emerald-600">Gana</Badge>
              ) : (
                <Badge variant="outline" className="shrink-0 text-muted-foreground">
                  Descartada
                </Badge>
              )}
              <span className="font-mono text-xs text-muted-foreground">#{c.ruleId}</span>
              <span className="truncate">{c.ruleName}</span>
              {c.exclusiveOutcome === "OUTCOME_TYPE" && (
                <Badge variant="outline" className="shrink-0 text-[10px]">
                  No Acumulable
                </Badge>
              )}
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{c.valueLabel}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
