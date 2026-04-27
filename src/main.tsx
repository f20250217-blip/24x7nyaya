import { Toaster } from "@/components/ui/sonner";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import Landing from "./pages/Landing.tsx";
import "./types/global.d.ts";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContactDialogProvider } from "@/components/ContactDialog";
import { InfoModalProvider } from "@/components/InfoModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <ContactDialogProvider>
          <InfoModalProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
          </InfoModalProvider>
        </ContactDialogProvider>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
