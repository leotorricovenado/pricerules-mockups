import { useState } from "react"
import { Trash2, Info, Plus } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CatalogCombobox } from "./CatalogCombobox"
import type { CatalogItem, ProductCatalogItem } from "../data/catalogs"
import type { CriteriaElementType, CriteriaRow, SpecificElementType, SpecificRow } from "../types"

interface ElementConfig<T extends string> {
  value: T
  label: string
  catalog: CatalogItem[]
}

// Panel "Criterios de la Regla" (el "quién") — ESPECIFICACION-UI-CAPTURADA.md §2.
export function CriteriaRowsPanel({
  rows,
  onChange,
  elements,
  hasDistributor,
}: {
  rows: CriteriaRow[]
  onChange: (rows: CriteriaRow[]) => void
  elements: ElementConfig<CriteriaElementType>[]
  hasDistributor: boolean
}) {
  const [selectedType, setSelectedType] = useState<CriteriaElementType>("UNIVERSAL")
  const activeType = rows.length > 0 ? rows[0].type : selectedType
  const config = elements.find((e) => e.value === activeType)
  const locked = rows.length > 0

  function addRow(item: CatalogItem) {
    onChange([
      ...rows,
      { id: crypto.randomUUID(), type: activeType, code: item.code, name: item.name },
    ])
  }

  function removeRow(id: string) {
    onChange(rows.filter((r) => r.id !== id))
  }

  const isCustomerAndBlocked = activeType === "CLIENTE" && !hasDistributor

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1.5">
          <label className="text-sm font-medium">Elemento</label>
          <Select
            value={activeType}
            disabled={locked}
            onValueChange={(v) => setSelectedType(v as CriteriaElementType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UNIVERSAL">Universal</SelectItem>
              {elements.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {locked && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="mb-2.5 size-4 shrink-0 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Elimina las filas cargadas para cambiar el tipo de criterio.</TooltipContent>
          </Tooltip>
        )}
      </div>

      {activeType === "UNIVERSAL" ? (
        <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
          Sin restricción — aplica a todos los sujetos de este criterio.
        </p>
      ) : (
        <>
          {isCustomerAndBlocked ? (
            <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
              Selecciona al menos una Distribuidora en Criterios Generales para buscar clientes.
            </p>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1">
                <CatalogCombobox
                  items={config?.catalog ?? []}
                  onSelect={addRow}
                  placeholder={`Buscar ${config?.label.toLowerCase() ?? ""}…`}
                />
              </div>
            </div>
          )}

          {rows.length > 0 && (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-muted-foreground">
                        {elements.find((e) => e.value === row.type)?.label}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeRow(row.id)}
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
        </>
      )}
    </div>
  )
}

// Panel "Criterios Específicos" (el "sobre qué producto") — misma mecánica, filas con Unidad de Medida.
export function SpecificRowsPanel({
  rows,
  onChange,
  elements,
}: {
  rows: SpecificRow[]
  onChange: (rows: SpecificRow[]) => void
  elements: ElementConfig<SpecificElementType>[]
}) {
  const [selectedType, setSelectedType] = useState<SpecificElementType>("UNIVERSAL")
  const activeType = rows.length > 0 ? rows[0].type : selectedType
  const config = elements.find((e) => e.value === activeType)
  const locked = rows.length > 0

  // Producto pasa por un paso intermedio: al elegirlo se muestra su Unidad de Medida real (viene
  // del catálogo, no se puede tocar) y recién con "Adicionar" se agrega la fila — igual que el JSF viejo.
  const [pendingProduct, setPendingProduct] = useState<ProductCatalogItem | null>(null)

  function addRow(item: CatalogItem) {
    if (activeType === "PRODUCTO") {
      setPendingProduct(item as ProductCatalogItem)
      return
    }
    onChange([
      ...rows,
      { id: crypto.randomUUID(), type: activeType, code: item.code, name: item.name },
    ])
  }

  function confirmAddProduct() {
    if (!pendingProduct) return
    onChange([
      ...rows,
      {
        id: crypto.randomUUID(),
        type: "PRODUCTO",
        code: pendingProduct.code,
        name: pendingProduct.name,
        unit: pendingProduct.unit,
      },
    ])
    setPendingProduct(null)
  }

  function removeRow(id: string) {
    onChange(rows.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1.5">
          <label className="text-sm font-medium">Elemento</label>
          <Select
            value={activeType}
            disabled={locked}
            onValueChange={(v) => {
              setSelectedType(v as SpecificElementType)
              setPendingProduct(null)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UNIVERSAL">Universal</SelectItem>
              {elements.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {locked && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="mb-2.5 size-4 shrink-0 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Elimina las filas cargadas para cambiar el tipo de criterio.</TooltipContent>
          </Tooltip>
        )}
      </div>

      {activeType === "UNIVERSAL" ? (
        <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
          Sin restricción — aplica a todos los productos.
        </p>
      ) : (
        <>
          <CatalogCombobox
            items={config?.catalog ?? []}
            onSelect={addRow}
            placeholder={
              activeType === "PRODUCTO" && pendingProduct
                ? pendingProduct.name
                : `Buscar ${config?.label.toLowerCase() ?? ""}…`
            }
          />

          {activeType === "PRODUCTO" && pendingProduct && (
            <div className="flex items-end gap-2 rounded-lg border bg-muted/30 p-3">
              <div className="flex-1 space-y-1.5">
                <Label>Unidad de Medida</Label>
                <Input value={pendingProduct.unit} disabled className="bg-muted" />
              </div>
              <Button type="button" onClick={confirmAddProduct} className="gap-1.5">
                <Plus /> Adicionar
              </Button>
            </div>
          )}

          {rows.length > 0 && (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Producto / Valor</TableHead>
                    <TableHead>Unidad de Medida</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-muted-foreground">
                        {elements.find((e) => e.value === row.type)?.label}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">{row.unit ?? "—"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeRow(row.id)}
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
        </>
      )}
    </div>
  )
}
