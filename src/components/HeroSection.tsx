import { useEffect, useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Vi o site da RYV e gostaria de saber mais sobre como vocês podem me ajudar com minha saúde ocular e bem-estar. Podemos conversar?"
    );
    const phone = "5511999999999";

    // Log do contato no backend
    fetch("http://localhost:3001/api/whatsapp-contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        message: message,
        source: "hero_section",
      }),
    }).catch(console.error);

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-light rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-accent-light/20 text-accent px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Conectando Saúde Mental e Visão
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary">Sua</span>{" "}
                <span className="text-accent">Visão</span>{" "}
                <span className="text-primary">Conectada</span> <br />
                <span className="text-primary">ao seu</span>{" "}
                <span className="text-accent">Bem-estar</span>
              </h1>

              <p className="text-xl text-secondary leading-relaxed max-w-2xl">
                Descubra como cuidar da sua visão pode transformar sua saúde
                mental. Somos especialistas em conectar esses dois mundos para
                uma vida mais plena e conectada.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="btn-primary flex items-center justify-center gap-3 text-lg px-8 py-4 animate-scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                Vamos Conversar?
              </button>

              <button
                className="btn-secondary flex items-center justify-center gap-3 text-lg px-8 py-4 animate-scale-in"
                style={{ animationDelay: "0.5s" }}
              >
                <HeartIcon className="h-6 w-6" />
                Descobrir Mais
              </button>
            </div>
          </div>

          {/* Image Right */}
          <div
            className={`relative ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-accent-light/30 rounded-full blur-3xl scale-150 animate-float"></div>

              {/* Main Image Container */}
              <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <img
                  src="/husky-oculos.webp"
                  alt="Husky com óculos - Conectando saúde mental e visão"
                  className="w-full h-auto rounded-2xl object-cover animate-gentle-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>

              {/* Floating Elements */}
              <div
                className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent-light rounded-full animate-float"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-20 grid grid-cols-3 gap-8 text-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.8s" }}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-secondary">Vidas Conectadas</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-secondary">Histórias</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-secondary">Confiança</div>
          </div>
        </div>

        {/* Bottom Right Icon */}
        <div
          className="absolute bottom-8 right-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-float"
          style={{ animationDelay: "2s" }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
