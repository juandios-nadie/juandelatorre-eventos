import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 hidden items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-[#20BD5A] hover:shadow-xl sm:flex"
    >
      <WhatsAppIcon size={22} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Cotizar por WhatsApp
      </span>
    </a>
  );
}
