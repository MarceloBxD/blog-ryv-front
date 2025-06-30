import React from "react";
import {
  HeartIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const handleWhatsAppClick = async () => {
    const message = encodeURIComponent(
      "Olá! Vi o site da RYV e fiquei impressionado com a conexão que vocês fazem entre saúde mental e visão. Gostaria de saber mais sobre como vocês podem me ajudar!"
    );
    const phone = "5511999999999"; // Substitua pelo número real

    // Registrar contato no banco de dados
    try {
      await fetch("http://localhost:3001/api/whatsapp/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Visitante do Site",
          phone: "Não informado",
          message: "Cliqueu no botão WhatsApp do Hero",
          source: window.location.href,
        }),
      });
    } catch (error) {
      console.log("Erro ao registrar contato:", error);
    }

    // Abrir WhatsApp
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <section className="gradient-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-ryv-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-ryv-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-ryv-primary-light rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Textual */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-ryv-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-ryv-dark mb-8">
              <SparklesIcon className="h-4 w-4 mr-2 text-ryv-primary" />
              Conectando Saúde Mental e Visão
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-ryv-dark mb-6">
              Sua <span className="text-gradient">Visão</span> Conectada
              <br />
              ao seu <span className="text-gradient">Bem-estar</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-ryv-dark-light mb-8 leading-relaxed">
              Descubra como cuidar da sua visão pode transformar sua saúde
              mental. Somos especialistas em conectar esses dois mundos para uma
              vida mais plena e conectada.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <button
                onClick={handleWhatsAppClick}
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                Vamos Conversar?
              </button>
              <a href="#artigos" className="btn-secondary text-lg px-8 py-4">
                <HeartIcon className="h-6 w-6 mr-2" />
                Descobrir Mais
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-ryv-primary mb-2">
                  500+
                </div>
                <div className="text-ryv-dark-light text-sm">
                  Vidas Conectadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ryv-primary-light mb-2">
                  50+
                </div>
                <div className="text-ryv-dark-light text-sm">
                  Histórias Compartilhadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ryv-primary mb-2">
                  98%
                </div>
                <div className="text-ryv-dark-light text-sm">Confiança</div>
              </div>
            </div>
          </div>

          {/* Imagem de Saúde Mental */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-60 lg:w-96 lg:h-72">
              <Image
                src="/mental-health-illustration.svg"
                alt="Ilustração conectando saúde mental e visão"
                fill
                className="object-contain animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-ryv-dark-lighter"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
