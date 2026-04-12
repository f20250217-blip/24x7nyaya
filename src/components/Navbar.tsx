import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Scale, Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: "English", label: "English" },
    { code: "Hindi", label: "Hindi (हिंदी)" },
    { code: "Marathi", label: "Marathi (मराठी)" },
    { code: "Gujarati", label: "Gujarati (ગુજરાતી)" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
            <Scale className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">24x7<span className="text-primary">NYAYA</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/find-lawyer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t("nav.findLawyer")}
          </Link>
          <Link to="/knowledge" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t("nav.knowledgeHub")}
          </Link>
          <Link to="/for-lawyers" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t("nav.forLawyers")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={langRef}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md z-50"
                >
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        language === lang.code && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                    >
                      {lang.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">{t("nav.dashboard")}</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                {t("nav.signOut")}
              </Button>
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </nav>
  );
}