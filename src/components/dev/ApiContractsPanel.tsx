import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Check, ChevronDown, Copy, Webhook, X } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { resolveScreenContracts } from "@/api-contracts/screens"
import { findContract } from "@/api-contracts/registry"
import { findExternalRef } from "@/api-contracts/externalRefs"
import { SERVICE_LABELS, type ApiContract, type ExternalRef, type HttpMethod, type ServiceOwner } from "@/api-contracts/types"

// Panel de desarrollo: documenta, para la pantalla que se está viendo, qué endpoints de este
// microservicio (Reglas de Precio) hacen falta y qué datos son en realidad referencias a otros
// microservicios (Sales/Catálogo). Es metadata a mano en src/api-contracts — no depende de que
// el mockup tenga un backend real. No forma parte del producto, solo se ve en este entorno.
export function ApiContractsPanel() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const screen = resolveScreenContracts(pathname)

  if (!screen) return null

  const contracts = screen.contractIds
    .map(findContract)
    .filter((c): c is ApiContract => Boolean(c))
  const externalRefs = screen.externalRefIds
    .map(findExternalRef)
    .filter((r): r is ExternalRef => Boolean(r))

  // Un grupo por servicio, en el orden en que aparecen en screens.ts (price-rules primero, Sales
  // después) — así una pantalla que llama a dos servicios los muestra por separado, con su propio
  // título, en vez de mezclarlos en una sola lista.
  const groups: { service: ServiceOwner; contracts: ApiContract[] }[] = []
  for (const c of contracts) {
    const group = groups.find((g) => g.service === c.service)
    if (group) group.contracts.push(c)
    else groups.push({ service: c.service, contracts: [c] })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg transition-opacity hover:opacity-90"
      >
        <Webhook className="size-4" />
        API
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l bg-background shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b p-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Endpoints de esta pantalla
                </p>
                <h2 className="text-lg font-semibold">{screen.title}</h2>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)} aria-label="Cerrar">
                <X />
              </Button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              {groups.map((group) => (
                <section key={group.service} className="space-y-2">
                  <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {group.service === "price-rules" ? "Microservicio Reglas de Precio" : SERVICE_LABELS[group.service]}
                  </h3>
                  <div className="space-y-2">
                    {group.contracts.map((c) => (
                      <ContractCard key={c.id} contract={c} />
                    ))}
                  </div>
                </section>
              ))}

              {externalRefs.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Referencias externas usadas acá
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Este servicio los guarda solo por id — el contrato de estos endpoints lo define
                    su microservicio dueño, no este.
                  </p>
                  <div className="space-y-2">
                    {externalRefs.map((r) => (
                      <ExternalRefCard key={r.id} ref={r} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  POST: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  PUT: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  PATCH: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  DELETE: "bg-red-500/10 text-red-700 dark:text-red-400",
}

function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span
      className={cn(
        "inline-flex w-14 shrink-0 justify-center rounded px-1.5 py-0.5 text-[10px] font-semibold",
        METHOD_STYLES[method]
      )}
    >
      {method}
    </span>
  )
}

const SERVICE_STYLES: Record<ServiceOwner, string> = {
  "price-rules": "bg-secondary text-secondary-foreground",
  sales: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
}

function ServiceBadge({ service }: { service: ServiceOwner }) {
  return (
    <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold", SERVICE_STYLES[service])}>
      {SERVICE_LABELS[service]}
    </span>
  )
}

function ContractCard({ contract }: { contract: ApiContract }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-2.5 p-2.5 text-left"
      >
        <MethodBadge method={contract.method} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[11px] text-muted-foreground">{contract.path}</span>
          <span className="block truncate text-sm font-medium">{contract.summary}</span>
        </span>
        {contract.status === "planned" && (
          <span className="shrink-0 rounded border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Planeado
          </span>
        )}
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} />
      </button>

      {expanded && (
        <div className="space-y-3 border-t p-3 text-sm">
          {contract.description && <p className="text-xs text-muted-foreground">{contract.description}</p>}

          {contract.pathParams && contract.pathParams.length > 0 && (
            <ParamsTable title="Path params" params={contract.pathParams} />
          )}
          {contract.queryParams && contract.queryParams.length > 0 && (
            <ParamsTable title="Query params" params={contract.queryParams} />
          )}
          {contract.requestBody && (
            <JsonBlock title="Request body" description={contract.requestBody.description} value={contract.requestBody.example} />
          )}
          {contract.responseBody && (
            <JsonBlock title="Response body" description={contract.responseBody.description} value={contract.responseBody.example} />
          )}
          {contract.notes && contract.notes.length > 0 && (
            <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
              {contract.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function ParamsTable({ title, params }: { title: string; params: { name: string; type: string; required?: boolean; description: string }[] }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-muted-foreground">{title}</p>
      <div className="overflow-hidden rounded-md border">
        {params.map((p) => (
          <div key={p.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-b p-2 text-xs last:border-b-0">
            <span className="font-mono font-medium">
              {p.name}
              {p.required && <span className="text-destructive">*</span>}
            </span>
            <span className="text-muted-foreground">{p.type}</span>
            <span className="w-full text-muted-foreground">{p.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function JsonBlock({ title, description, value }: { title: string; description?: string; value: unknown }) {
  const [copied, setCopied] = useState(false)
  const json = typeof value === "string" ? value : JSON.stringify(value, null, 2)

  async function copy() {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      toast.success("Copiado al portapapeles")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("No se pudo copiar")
    }
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          Copiar
        </button>
      </div>
      {description && <p className="mb-1 text-xs text-muted-foreground">{description}</p>}
      <pre className="max-h-64 overflow-auto rounded-md bg-muted/50 p-2 font-mono text-[11px] leading-relaxed">
        {json}
      </pre>
    </div>
  )
}

function ExternalRefCard({ ref }: { ref: ExternalRef }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-dashed p-2.5 opacity-90">
      <ServiceBadge service={ref.service} />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{ref.label}</div>
        <div className="text-xs text-muted-foreground">{ref.usage}</div>
        <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">catalogs.ts → {ref.mockSource}</div>
      </div>
    </div>
  )
}
