// Paleta validada (skill dataviz, references/palette.md) — hues fijos en orden fijo, no generados
// por serie. `light`/`dark` en vez de un solo `color` para que cada tono tenga su propio paso en
// dark mode (ver ChartConfig en components/ui/chart.tsx, que arma `--color-<key>` por tema).
export const CATEGORICAL_HUES = [
  { light: "#2a78d6", dark: "#3987e5" }, // blue — slot 1
  { light: "#eb6834", dark: "#d95926" }, // orange — slot 2
  { light: "#1baf7a", dark: "#199e70" }, // aqua — slot 3
  { light: "#eda100", dark: "#c98500" }, // yellow — slot 4
  { light: "#e87ba4", dark: "#d55181" }, // magenta — slot 5
] as const

// Para comparaciones de magnitud (conteos por categoría) se usa un solo hue — el slot 1 — en vez
// de un color por barra: ninguna de esas categorías es "la serie", todas miden lo mismo.
export const MAGNITUDE_HUE = CATEGORICAL_HUES[0]

// Mismos tonos que ya usan los badges de estado en toda la app (RuleStatusBadge.tsx: emerald /
// amber / destructive) — el dashboard reutiliza ese vocabulario de color en vez de introducir uno
// nuevo para "aprobada / pendiente / rechazada".
export const STATUS_HUES = {
  good: { light: "#10b981", dark: "#10b981" },
  warning: { light: "#f59e0b", dark: "#f59e0b" },
  critical: { light: "#ef4444", dark: "#ef4444" },
} as const
