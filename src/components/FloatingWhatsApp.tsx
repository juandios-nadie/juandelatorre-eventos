import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
    >
      <WhatsAppIcon size={22} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Cotizar por WhatsApp
      </span>
    </a>
  );
}
