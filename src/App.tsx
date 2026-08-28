import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppLayout } from "@/app/AppLayout"
import { AuthProvider } from "@/app/auth"
import { PriceRulesProvider } from "@/features/price-rules/store"
import { PriceRuleListPage } from "@/features/price-rules/pages/PriceRuleListPage"
import { PriceRuleFormPage } from "@/features/price-rules/pages/PriceRuleFormPage"
import { PriceRuleDetailPage } from "@/features/price-rules/pages/PriceRuleDetailPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"

function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <PriceRulesProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/reglas-precio" element={<PriceRuleListPage />} />
                <Route path="/reglas-precio/nueva" element={<PriceRuleFormPage />} />
                <Route path="/reglas-precio/:id" element={<PriceRuleDetailPage />} />
                <Route path="/reglas-precio/:id/editar" element={<PriceRuleFormPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PriceRulesProvider>
      </AuthProvider>
      <Toaster position="top-right" />
    </TooltipProvider>
  )
}

export default App
