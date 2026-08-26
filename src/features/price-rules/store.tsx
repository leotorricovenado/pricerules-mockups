import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"
import { useAuth } from "@/app/auth"
import { MOCK_PRICE_RULES } from "./data/mock-price-rules"
import type { ExclusiveOutcome, PriceRule } from "./types"

interface PriceRulesContextValue {
  rules: PriceRule[]
  getRule: (id: number) => PriceRule | undefined
  createRule: (rule: Omit<PriceRule, "id" | "createdBy" | "createdAt" | "updatedAt">) => PriceRule
  updateRule: (id: number, rule: Omit<PriceRule, "id" | "createdBy" | "createdAt" | "updatedAt">) => void
  approveRule: (id: number, exclusiveOutcome: ExclusiveOutcome) => void
  rejectRule: (id: number) => void
  toggleEnabled: (id: number) => void
  duplicateRule: (id: number) => PriceRule | undefined
}

const PriceRulesContext = createContext<PriceRulesContextValue | null>(null)

// Store en memoria — no hay backend en este mockup (CRM-DEAL-FRONTEND-CONTEXTO.md: en la app real
// esto sería TanStack Query contra el microservicio de Reglas de Precio vía el API Gateway).
export function PriceRulesProvider({ children }: { children: ReactNode }) {
  const [rules, setRules] = useState<PriceRule[]>(MOCK_PRICE_RULES)
  const { user } = useAuth()

  const value = useMemo<PriceRulesContextValue>(
    () => ({
      rules,
      getRule: (id) => rules.find((r) => r.id === id),
      createRule: (data) => {
        const now = new Date().toISOString()
        const newRule: PriceRule = {
          ...data,
          id: Math.max(0, ...rules.map((r) => r.id)) + 1,
          createdBy: user.id,
          createdAt: now,
          updatedAt: now,
        }
        setRules((prev) => [newRule, ...prev])
        toast.success(`Regla #${newRule.id} creada`, {
          description: "Queda pendiente de aprobación comercial.",
        })
        return newRule
      },
      updateRule: (id, data) => {
        setRules((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r))
        )
        toast.success(`Regla #${id} actualizada`)
      },
      approveRule: (id, exclusiveOutcome) => {
        setRules((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  approvalStatus: "APPROVED",
                  status: "ENABLE",
                  exclusiveOutcome,
                  updatedAt: new Date().toISOString(),
                }
              : r
          )
        )
        toast.success(`Regla #${id} aprobada y activada`)
      },
      rejectRule: (id) => {
        setRules((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, approvalStatus: "REJECTED", status: "DISABLED", updatedAt: new Date().toISOString() }
              : r
          )
        )
        toast.error(`Regla #${id} rechazada`)
      },
      toggleEnabled: (id) => {
        let nextEnabled = false
        setRules((prev) =>
          prev.map((r) => {
            if (r.id !== id) return r
            nextEnabled = r.status !== "ENABLE"
            return { ...r, status: nextEnabled ? "ENABLE" : "DISABLED", updatedAt: new Date().toISOString() }
          })
        )
        toast.success(`Regla #${id} ${nextEnabled ? "activada" : "desactivada"}`)
      },
      duplicateRule: (id) => {
        const original = rules.find((r) => r.id === id)
        if (!original) return undefined
        const now = new Date().toISOString()
        const newRule: PriceRule = {
          ...original,
          id: Math.max(0, ...rules.map((r) => r.id)) + 1,
          name: `${original.name} (copia)`,
          status: "DISABLED",
          approvalStatus: "WAITING_COMMERCIAL_APPROVAL",
          createdBy: user.id,
          createdAt: now,
          updatedAt: now,
        }
        setRules((prev) => [newRule, ...prev])
        toast.success(`Regla #${newRule.id} creada como copia de #${id}`, {
          description: "Queda pendiente de aprobación comercial.",
        })
        return newRule
      },
    }),
    [rules, user]
  )

  return <PriceRulesContext.Provider value={value}>{children}</PriceRulesContext.Provider>
}

export function usePriceRules() {
  const ctx = useContext(PriceRulesContext)
  if (!ctx) throw new Error("usePriceRules debe usarse dentro de PriceRulesProvider")
  return ctx
}
