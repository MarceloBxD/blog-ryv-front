import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import CookieConsent from "./CookieConsent";
import DailyRecommendation from "./DailyRecommendation";
import Gamification from "./Gamification";
import { BannerAd } from "./GoogleAds";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "RYV - Conectando Saúde Mental e Visão",
  description = "Somos especialistas em saúde mental, ótica e optometria. Conectamos você com os melhores cuidados para sua visão e bem-estar emocional.",
}) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Histórias", href: "/#artigos" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Contato", href: "/#contato" },
  ];

  const handleWhatsAppClick = async () => {
    const message = encodeURIComponent(
      "Olá! Vi o site da RYV e gostaria de saber mais sobre como vocês podem me ajudar com minha saúde ocular e bem-estar. Podemos conversar?"
    );
    const phone = "5511999999999";

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
          message: "Cliqueu no botão WhatsApp do Header",
          source: window.location.href,
        }),
      });
    } catch (error) {
      console.log("Erro ao registrar contato:", error);
    }

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | RYV` : "RYV - Conectando Saúde Mental e Visão"}
        </title>
        <meta
          name="description"
          content={
            description ||
            "Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica e bem-estar."
          }
        />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="min-h-screen bg-ryv-white">
        {/* Header */}
        <header className="bg-ryv-white shadow-sm border-b border-ryv-secondary sticky top-0 z-30">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo-ryv.webp"
                    alt="RYV"
                    width={32}
                    height={32}
                  />
                  <span className="ml-2 text-xl font-bold text-ryv-dark">
                    RYV
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-ryv-primary ${
                        router.pathname === item.href
                          ? "text-ryv-primary"
                          : "text-ryv-dark hover:text-ryv-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <button
                  onClick={handleWhatsAppClick}
                  className="btn-whatsapp px-4 py-2 text-sm"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  Conectar
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-ryv-dark hover:text-ryv-primary transition-colors"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-ryv-white border-t border-ryv-secondary">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      router.pathname === item.href
                        ? "text-ryv-primary bg-ryv-secondary"
                        : "text-ryv-dark hover:text-ryv-primary hover:bg-ryv-secondary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleWhatsAppClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 btn-whatsapp px-4 py-2 text-sm"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  Conectar
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-ryv-dark text-ryv-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <Image
                    src="/logo-ryv.webp"
                    alt="RYV"
                    width={32}
                    height={32}
                  />
                  <span className="ml-2 text-xl font-bold">RYV</span>
                </div>
                <p className="text-ryv-secondary mb-4 max-w-md">
                  Conectando saúde mental e visão para uma vida mais plena e
                  conectada. Somos especialistas em transformar sua perspectiva
                  sobre bem-estar.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="btn-whatsapp px-4 py-2 text-sm"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    Conectar
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-ryv-secondary hover:text-ryv-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contato</h3>
                <div className="space-y-2 text-ryv-secondary">
                  <p>📧 contato@ryv.com.br</p>
                  <p>📱 (11) 99999-9999</p>
                  <p>📍 São Paulo, SP</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-ryv-dark-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-ryv-secondary text-sm">
                © 2024 RYV. Todos os direitos reservados.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link
                  href="/politica-privacidade"
                  className="text-ryv-secondary hover:text-ryv-white text-sm transition-colors"
                >
                  Política de Privacidade
                </Link>
                <Link
                  href="/termos-uso"
                  className="text-ryv-secondary hover:text-ryv-white text-sm transition-colors"
                >
                  Termos de Uso
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Google Ads - Banner no final */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerAd />
          </div>
        </div>

        {/* Componentes de Engajamento */}
        <CookieConsent />
        <DailyRecommendation />
        <Gamification />
      </div>
    </>
  );
};

export default Layout;
