import { FlaskConical, LayoutDashboard, Tag } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon: typeof LayoutDashboard
  isActive: (pathname: string) => boolean
}

// Único módulo del mockup (CRM-DEAL tendrá más microservicios/secciones en el sidebar a futuro,
// ver CLAUDE.md §12) — hoy Dashboard, Reglas de Precio y el Simulador (CLAUDE.md §29, caso B).
// El Simulador es una entrada de nivel superior (no un tab dentro de Reglas de Precio) porque no
// gira en torno a UNA regla — corre un conjunto elegido a mano, más parecido a una herramienta que
// a una pantalla CRUD.
const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, isActive: (p) => p === "/dashboard" },
  {
    title: "Reglas de Precio",
    url: "/reglas-precio",
    icon: Tag,
    isActive: (p) => p.startsWith("/reglas-precio") && p !== "/reglas-precio/simulador",
  },
  { title: "Simulador", url: "/reglas-precio/simulador", icon: FlaskConical, isActive: (p) => p === "/reglas-precio/simulador" },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Tag className="size-4" />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">CRM-DEAL</span>
                <span className="truncate text-xs text-muted-foreground">Reglas de Precio</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Comercial</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={item.isActive(location.pathname)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
