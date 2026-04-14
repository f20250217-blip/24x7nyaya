import { useEffect, useState } from "react";
import { Palette, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeId = "crimson" | "sapphire" | "forest" | "emerald" | "teal" | "slate";

type ThemeDef = {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: [string, string, string, string];
};

const THEMES: ThemeDef[] = [
  {
    id: "crimson",
    name: "Heritage Crimson",
    tagline: "Ivory · Carpet Red · Antique Gold",
    swatches: ["#F7F0DF", "#A6812A", "#C8141E", "#8B0E16"],
  },
  {
    id: "sapphire",
    name: "Sapphire Court",
    tagline: "Cool Ivory · Brushed Silver · Sapphire",
    swatches: ["#EEF2F8", "#64748B", "#1E40AF", "#0C1E3F"],
  },
  {
    id: "forest",
    name: "Forest Brief",
    tagline: "Warm Cream · Gold · Deep Emerald",
    swatches: ["#F2EFE2", "#9C7A2E", "#0F5132", "#053920"],
  },
  {
    id: "emerald",
    name: "Emerald Heritage",
    tagline: "Pale Cream · Antique Gold · Jewel Emerald",
    swatches: ["#EEF4EC", "#A6812A", "#047857", "#022C22"],
  },
  {
    id: "teal",
    name: "Teal Aurum",
    tagline: "Cool Cream · Aged Gold · Deep Teal",
    swatches: ["#EEF4F4", "#B8893A", "#0F766E", "#042F2E"],
  },
  {
    id: "slate",
    name: "Slate Platinum",
    tagline: "Neutral White · Brushed Gold · Graphite",
    swatches: ["#F1F0ED", "#B58A2F", "#2D2D33", "#0A0A0C"],
  },
];

const STORAGE_KEY = "nyaya-theme";
const ALL_THEME_CLASSES = THEMES.map((t) => `theme-${t.id}`);

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.classList.remove(...ALL_THEME_CLASSES);
  root.classList.add(`theme-${id}`);
}

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>("crimson");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? "crimson";
    setActive(saved);
    applyTheme(saved);
  }, []);

  const pick = (id: ThemeId) => {
    setActive(id);
    applyTheme(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-3 w-[320px] rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(160deg, color-mix(in srgb, var(--card) 92%, transparent), color-mix(in srgb, var(--cream-3) 80%, transparent))",
              border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
              boxShadow:
                "0 24px 60px -18px color-mix(in srgb, var(--panel-1) 35%, transparent), 0 8px 24px -10px color-mix(in srgb, var(--secondary) 18%, transparent)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--primary)" }}
                >
                  Premium Palettes
                </div>
                <div className="text-sm font-semibold text-foreground">
                  Choose a theme
                </div>
              </div>
              <button
                aria-label="Close theme picker"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center transition-colors hover:bg-[color:var(--muted)]"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2">
              {THEMES.map((t) => {
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => pick(t.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group"
                    style={{
                      background: isActive
                        ? "color-mix(in srgb, var(--primary) 14%, transparent)"
                        : "transparent",
                      border: isActive
                        ? "1px solid color-mix(in srgb, var(--primary) 45%, transparent)"
                        : "1px solid transparent",
                    }}
                  >
                    <div className="flex gap-0.5 shrink-0">
                      {t.swatches.map((c, i) => (
                        <span
                          key={i}
                          className="h-8 w-4 first:rounded-l-md last:rounded-r-md"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-foreground leading-tight">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        {t.tagline}
                      </div>
                    </div>
                    {isActive && (
                      <Check
                        className="h-4 w-4 shrink-0"
                        style={{ color: "var(--primary)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-3 pt-3 text-[11px] text-muted-foreground text-center border-t"
              style={{ borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              Selection persists on this device.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open theme picker"
        className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, var(--primary), var(--secondary))",
          color: "var(--primary-foreground)",
          boxShadow:
            "0 12px 28px -8px color-mix(in srgb, var(--secondary) 50%, transparent), 0 4px 12px -4px color-mix(in srgb, var(--panel-1) 40%, transparent)",
        }}
      >
        <Palette className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
