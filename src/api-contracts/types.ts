// Metadata declarativa de "qué endpoint haría falta" para cada dato que el mockup muestra o envía.
// No hay backend real: esto es documentación viva, a mano, que vive junto al mockup y se actualiza
// cuando cambia una pantalla. Ver CLAUDE.md §12 (arquitectura objetivo CRM-DEAL) para el contrato
// de servicios y quién es dueño de qué.

// Un solo servicio externo, no dos: el módulo de Catálogo (producto/marca/categoría/familia/
// sub-familia/división) vive DENTRO del microservicio de Sales, no aparte — confirmado por el
// usuario. Antes de esto el mockup los separaba como "catalog"; se corrigió acá y en
// externalRefs.ts.
export type ServiceOwner = "price-rules" | "sales"

export const SERVICE_LABELS: Record<ServiceOwner, string> = {
  "price-rules": "Reglas de Precio",
  sales: "Sales",
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface ApiParam {
  name: string
  type: string
  required?: boolean
  description: string
}

export interface ApiContract {
  id: string
  service: ServiceOwner
  method: HttpMethod
  path: string
  summary: string
  description?: string
  /** implemented = lo ejercita este mockup. planned = está en el contrato objetivo (CLAUDE.md) pero
   *  todavía no hay pantalla que lo dispare — se documenta igual para no perder el hallazgo. */
  status: "implemented" | "planned"
  pathParams?: ApiParam[]
  queryParams?: ApiParam[]
  requestBody?: { description?: string; example: unknown }
  responseBody?: { description?: string; example: unknown }
  notes?: string[]
}

export interface ExternalRef {
  id: string
  service: Extract<ServiceOwner, "sales">
  label: string
  /** De dónde sale este dato en el mockup — la constante en data/catalogs.ts que lo simula hoy. */
  mockSource: string
  usage: string
}
