import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

const NYAYA_PHONE = "918090302222"; // wa.me format, no + or spaces
const NYAYA_PHONE_DISPLAY = "+91 80903 02222";
const NYAYA_EMAIL = "info@24x7nyaya.com";

type ContactPurpose =
  | "Find a Lawyer"
  | "Knowledge Hub"
  | "For Lawyers"
  | "Get Help"
  | "Solutions"
  | "Join Us"
  | "Services"
  | "About Us"
  | "Contact"
  | "Terms & Conditions"
  | "Privacy Policy"
  | "Disclaimer"
  | "General Inquiry";

type ContactDialogContextValue = {
  open: (purpose?: ContactPurpose) => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export function useContactDialog() {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) throw new Error("useContactDialog must be used inside ContactDialogProvider");
  return ctx;
}

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [purpose, setPurpose] = useState<ContactPurpose>("General Inquiry");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const open = useCallback((p: ContactPurpose = "General Inquiry") => {
    setPurpose(p);
    setIsOpen(true);
  }, []);

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  const buildBody = () => {
    return [
      `New inquiry via 24x7Nyaya website`,
      ``,
      `Topic: ${purpose}`,
      `Name: ${name || "(not provided)"}`,
      `Phone: ${phone || "(not provided)"}`,
      `Email: ${email || "(not provided)"}`,
      ``,
      `Message:`,
      message || "(no message)",
    ].join("\n");
  };

  const validate = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!phone.trim() && !email.trim()) {
      toast.error("Please share at least a phone number or email so we can reach you");
      return false;
    }
    if (!message.trim()) {
      toast.error("Please describe your query");
      return false;
    }
    return true;
  };

  const sendOnWhatsApp = () => {
    if (!validate()) return;
    const url = `https://wa.me/${NYAYA_PHONE}?text=${encodeURIComponent(buildBody())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — your query is prefilled. Just hit send.");
    setIsOpen(false);
    reset();
  };

  const sendOnEmail = () => {
    if (!validate()) return;
    const subject = `[24x7Nyaya] ${purpose} — ${name}`;
    const url = `mailto:${NYAYA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
    window.location.href = url;
    toast.success("Opening your email client — your query is prefilled.");
    setIsOpen(false);
    reset();
  };

  const value = useMemo(() => ({ open }), [open]);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={(next) => { setIsOpen(next); if (!next) reset(); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">{purpose}</DialogTitle>
            <DialogDescription>
              Share your details and we'll reach out. Your query goes straight to{" "}
              <span className="font-semibold text-foreground">{NYAYA_PHONE_DISPLAY}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Your Name *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                autoComplete="name"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 …"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Your Query *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe what you need help with…"
                rows={4}
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none"
              />
            </div>

            <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>Call us directly: <a className="font-semibold text-foreground hover:text-primary" href={`tel:+${NYAYA_PHONE}`}>{NYAYA_PHONE_DISPLAY}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>Or email: <a className="font-semibold text-foreground hover:text-primary" href={`mailto:${NYAYA_EMAIL}`}>{NYAYA_EMAIL}</a></span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={sendOnEmail} className="gap-2">
              <Mail className="h-4 w-4" />
              Send via Email
            </Button>
            <Button onClick={sendOnWhatsApp} className="gap-2 bg-primary text-background hover:bg-primary/90">
              <MessageCircle className="h-4 w-4" />
              Send via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
}
