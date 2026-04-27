import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type InfoTopic = "terms" | "privacy" | "disclaimer";

const CONTENT: Record<InfoTopic, { title: string; subtitle: string; sections: { heading: string; body: string }[] }> = {
  terms: {
    title: "Terms & Conditions",
    subtitle: "Last updated: April 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing 24x7Nyaya, you agree to these terms. If you do not agree, please do not use the platform.",
      },
      {
        heading: "2. Nature of Service",
        body: "24x7Nyaya is a digital platform that connects users with independent legal professionals and provides access to legal information. We are not a law firm and do not provide legal advice ourselves. Any consultation is between you and the empanelled lawyer.",
      },
      {
        heading: "3. User Responsibilities",
        body: "You agree to provide accurate information, use the platform only for lawful purposes, and not impersonate any person or entity. You are responsible for maintaining the confidentiality of any account credentials.",
      },
      {
        heading: "4. Fees",
        body: "Consultation fees, if any, are clearly displayed before booking. Payments made for consultations are governed by the cancellation/refund policy communicated at the time of booking.",
      },
      {
        heading: "5. Limitation of Liability",
        body: "24x7Nyaya is not liable for the legal advice or services rendered by independent advocates listed on the platform. Our liability is limited to the platform fee paid, if any.",
      },
      {
        heading: "6. Changes to Terms",
        body: "We may update these terms periodically. Continued use of the platform after changes constitutes acceptance of the revised terms.",
      },
      {
        heading: "7. Governing Law",
        body: "These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Gurugram, Haryana.",
      },
      {
        heading: "Contact",
        body: "Questions about these terms? Email info@24x7nyaya.com or call +91 80903 02222.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Last updated: April 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We collect contact details (name, phone, email) you submit through our forms, and basic usage data (browser type, pages visited) to operate the platform.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "Your information is used solely to respond to your queries, connect you with relevant legal professionals, and improve the service. We do not sell your personal information.",
      },
      {
        heading: "3. Sharing",
        body: "We share your contact details with the empanelled lawyer you choose to consult. We may share data with service providers (hosting, analytics) under strict confidentiality. We disclose information when required by law.",
      },
      {
        heading: "4. Data Security",
        body: "We use industry-standard measures to protect your data. However, no internet transmission is 100% secure; you share information at your own risk.",
      },
      {
        heading: "5. Cookies",
        body: "We use cookies for essential site function and language preference. You can disable cookies in your browser, though this may impact functionality.",
      },
      {
        heading: "6. Your Rights",
        body: "You can request access, correction, or deletion of your personal data by writing to info@24x7nyaya.com. We will respond within a reasonable time.",
      },
      {
        heading: "7. Changes",
        body: "This policy may be updated. The current version will always be available on this page.",
      },
      {
        heading: "Contact",
        body: "Privacy questions? Email info@24x7nyaya.com.",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    subtitle: "Important — please read",
    sections: [
      {
        heading: "Not Legal Advice",
        body: "Information on 24x7Nyaya is for general awareness only and does not constitute legal advice. For advice on your specific situation, consult a qualified advocate through the platform.",
      },
      {
        heading: "No Lawyer–Client Relationship",
        body: "Browsing this website or submitting a contact form does not create a lawyer–client relationship. Such a relationship is established only after formal engagement with an empanelled advocate.",
      },
      {
        heading: "Bar Council of India Rules",
        body: "In compliance with Bar Council of India rules, 24x7Nyaya does not advertise legal services. Content on this site is intended only to provide information and facilitate user-initiated contact with legal professionals.",
      },
      {
        heading: "Accuracy of Information",
        body: "While we make reasonable efforts to keep information accurate and current, laws change. We do not warrant that all content is up to date, complete, or applicable to your situation.",
      },
      {
        heading: "Third-Party Links",
        body: "External links (e.g. India Code) are provided for convenience. We are not responsible for the content or practices of third-party sites.",
      },
      {
        heading: "Contact",
        body: "Questions? Email info@24x7nyaya.com or call +91 80903 02222.",
      },
    ],
  },
};

type InfoModalContextValue = {
  open: (topic: InfoTopic) => void;
};

const InfoModalContext = createContext<InfoModalContextValue | null>(null);

export function useInfoModal() {
  const ctx = useContext(InfoModalContext);
  if (!ctx) throw new Error("useInfoModal must be used inside InfoModalProvider");
  return ctx;
}

export function InfoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<InfoTopic>("terms");

  const open = useCallback((t: InfoTopic) => {
    setTopic(t);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);
  const content = CONTENT[topic];

  return (
    <InfoModalContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{content.title}</DialogTitle>
            <DialogDescription>{content.subtitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-relaxed">
            {content.sections.map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-1">{section.heading}</h4>
                <p className="text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </InfoModalContext.Provider>
  );
}
