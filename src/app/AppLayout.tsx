import { Outlet, useLocation } from "react-router-dom"
import { ApiContractsPanel } from "@/components/dev/ApiContractsPanel"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { UserSwitcher } from "./UserSwitcher"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
}

// Shell con sidebar colapsable (shadcn `Sidebar`, ver AppSidebar.tsx) — reemplaza el navbar
// horizontal original ahora que hay más de una vista (Dashboard + Reglas de Precio, CLAUDE.md
// pide "seguramente tendrás que añadir un sidebar o un navbar" al pedir el dashboard). El mockup
// de app shell completo (login/MFA/RBAC/sesión) sigue fuera de alcance
// (CRM-DEAL-FRONTEND-CONTEXTO.md §6) — esto solo da contexto de navegación entre módulos.
export function AppLayout() {
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname]

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* min-w-0: sin esto, un <main> flex-1 no se achica por debajo del ancho intrínseco de su
          contenido (bug clásico de flexbox) — con el sidebar expandido, esto forzaba scroll
          horizontal en toda la página en vez de sólo dentro de la tabla. */}
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          {title && <h2 className="text-sm font-medium">{title}</h2>}
          <div className="ml-auto">
            <UserSwitcher />
          </div>
        </header>
        {/* div, no <main> — SidebarInset ya renderiza el landmark <main>; anidar otro <main> adentro
            es HTML inválido (dos landmarks "main" en la misma página). */}
        <div className="mx-auto w-full max-w-[1300px] flex-1 px-6 py-8">
          <Outlet />
        </div>
      </SidebarInset>
      <ApiContractsPanel />
    </SidebarProvider>
  )
}
