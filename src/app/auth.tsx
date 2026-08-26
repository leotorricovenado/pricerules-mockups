import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

// RBAC de mockup — CRM-DEAL-FRONTEND-CONTEXTO.md §5.3: "el router y los componentes deben
// condicionar por permiso, no por rol hardcodeado (`can('approve_discount')`, no
// `if (role === 'Supervisor')`)". Acá no hay login real: un selector en el header cambia de
// usuario para poder mostrar la diferencia de vista entre roles sin dos sesiones distintas.

export type UserRole = "ADMIN" | "COMMERCIAL_MANAGER"

export type Permission =
  | "price_rules.create"
  | "price_rules.bulk_import"
  | "price_rules.view"
  | "price_rules.edit"
  | "price_rules.duplicate"
  | "price_rules.toggle_status"
  | "price_rules.approve"

export interface AppUser {
  id: string
  name: string
  role: UserRole
  roleLabel: string
}

export const USERS: AppUser[] = [
  { id: "admin", name: "Administrador", role: "ADMIN", roleLabel: "Admin" },
  {
    id: "fernando.unzueta",
    name: "Fernando Unzueta",
    role: "COMMERCIAL_MANAGER",
    roleLabel: "Gerente Comercial",
  },
]

// Admin gestiona el ciclo de vida de la regla (CRUD + activar/desactivar) pero no la aprueba —
// separación de funciones: quien la crea/edita no es quien la aprueba. El Gerente Comercial es
// quien realmente aprueba en el sistema real (CLAUDE.md §9, PRICING_ENABLE_USERS_FOR_APPROVING_RULE_APP
// incluye fernando.unzueta) y puede activar/desactivar, pero no crea reglas nuevas.
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    "price_rules.create",
    "price_rules.bulk_import",
    "price_rules.view",
    "price_rules.edit",
    "price_rules.duplicate",
    "price_rules.toggle_status",
  ],
  COMMERCIAL_MANAGER: ["price_rules.view", "price_rules.toggle_status", "price_rules.approve"],
}

interface AuthContextValue {
  user: AppUser
  setUserId: (id: string) => void
  can: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "venado-mock-user"

function readStoredUserId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? USERS[0].id
  } catch {
    return USERS[0].id
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Persistido en localStorage — sin esto, escribir una URL a mano o refrescar la página
  // resetea el usuario a Admin en medio de una demo (no hay login real detrás).
  const [userId, setUserIdState] = useState(readStoredUserId)
  const user = USERS.find((u) => u.id === userId) ?? USERS[0]

  function setUserId(id: string) {
    setUserIdState(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // localStorage no disponible (modo privado, etc.) — el cambio sigue valiendo para la sesión actual.
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      setUserId,
      can: (permission) => ROLE_PERMISSIONS[user.role].includes(permission),
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return ctx
}
