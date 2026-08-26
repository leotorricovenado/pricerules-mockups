import { User } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth, USERS } from "./auth"

// Selector de usuario — no hay login real en el mockup, esto simula cambiar de sesión para
// mostrar cómo cambia la vista de Reglas de Precio según el rol (ver auth.tsx).
export function UserSwitcher() {
  const { user, setUserId } = useAuth()

  return (
    <div className="flex items-center gap-1.5">
      <User className="size-3.5 text-muted-foreground" />
      <Select value={user.id} onValueChange={setUserId}>
        <SelectTrigger size="sm" className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {USERS.map((u) => (
            <SelectItem key={u.id} value={u.id}>
              {u.name} · {u.roleLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
