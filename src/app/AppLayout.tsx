import { Link, Outlet, useLocation } from "react-router-dom"
import { Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserSwitcher } from "./UserSwitcher"

// Shell mínimo — el mockup de app shell completo (login/MFA/RBAC/sesión) queda fuera de este
// primer alcance (CRM-DEAL-FRONTEND-CONTEXTO.md §6). Esto solo da contexto de navegación
// para moverse entre listado / crear / detalle de Reglas de Precio.
export function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Tag className="size-4" />
            CRM-DEAL
          </div>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/reglas-precio"
              className={cn(
                "rounded-md px-3 py-1.5 transition-colors",
                location.pathname.startsWith("/reglas-precio")
                  ? "bg-secondary font-medium text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Reglas de Precio
            </Link>
          </nav>
          <div className="ml-auto">
            <UserSwitcher />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
