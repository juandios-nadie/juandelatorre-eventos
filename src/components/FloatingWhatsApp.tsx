import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 hidden items-center gap-2.5 rounded-full bg-[#075E54] px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-[#064D45] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal sm:flex"
    >
      <WhatsAppIcon size={22} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-focus-visible:max-w-xs motion-reduce:transition-none">
        Cotizar por WhatsApp
      </span>
    </a>
  );
}
