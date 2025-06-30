import React, { useState, useEffect } from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ryv-dark text-ryv-white p-4 shadow-lg border-t border-ryv-primary">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <ShieldCheckIcon className="h-6 w-6 text-ryv-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Respeitamos sua privacidade</p>
            <p className="text-ryv-secondary text-xs leading-relaxed">
              Utilizamos cookies para melhorar sua experiência, personalizar
              conteúdo e analisar o tráfego. Ao continuar navegando, você
              concorda com nossa{" "}
              <a
                href="/politica-privacidade"
                className="text-ryv-primary hover:underline"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm font-medium text-ryv-secondary hover:text-ryv-white transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-ryv-primary hover:bg-ryv-primary-light text-white text-sm font-medium rounded-lg transition-colors"
          >
            Aceitar
          </button>
          <button
            onClick={() => setShowConsent(false)}
            className="p-1 text-ryv-secondary hover:text-ryv-white transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
