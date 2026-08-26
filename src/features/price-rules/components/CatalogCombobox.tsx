import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { CatalogItem } from "../data/catalogs"

// Combobox con búsqueda "contiene" (no prefijo) — replica el select2 typeahead del JSF viejo
// (ESPECIFICACION-UI-CAPTURADA.md §2: "buscar '12' trae '134125'").
export function CatalogCombobox({
  items,
  onSelect,
  placeholder = "Buscar…",
  disabled = false,
  emptyMessage = "Sin resultados.",
}: {
  items: CatalogItem[]
  onSelect: (item: CatalogItem) => void
  placeholder?: string
  disabled?: boolean
  emptyMessage?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Search className="size-3.5" />
            {placeholder}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command
          filter={(value, search) => {
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}
        >
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.code} ${item.name}`}
                  onSelect={() => {
                    onSelect(item)
                    setOpen(false)
                  }}
                >
                  <Check className="opacity-0" />
                  <span className="flex flex-col">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.code}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Multi-select simple sobre el mismo patrón (Distribuidora, Almacenes) — checkboxes dentro del Command.
export function CatalogMultiSelect({
  items,
  selectedIds,
  onChange,
  placeholder = "Seleccionar…",
}: {
  items: CatalogItem[]
  selectedIds: number[]
  onChange: (ids: number[]) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)

  function toggle(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  const summary =
    selectedIds.length === 0
      ? placeholder
      : selectedIds.length === 1
        ? items.find((i) => i.id === selectedIds[0])?.name
        : `${selectedIds.length} seleccionados`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            selectedIds.length === 0 && "text-muted-foreground"
          )}
        >
          <span className="truncate">{summary}</span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command
          filter={(value, search) => {
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}
        >
          <CommandInput placeholder="Buscar…" />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.code} ${item.name}`}
                  onSelect={() => toggle(item.id)}
                >
                  <Check
                    className={cn(
                      selectedIds.includes(item.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex flex-col">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.code}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
