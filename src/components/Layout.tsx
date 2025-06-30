import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { PhoneIcon } from "@heroicons/react/24/outline";

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
  const handleWhatsAppClick = async () => {
    const message = encodeURIComponent(
      "Olá! Vi o site da RYV e gostaria de saber mais sobre como vocês podem me ajudar com minha saúde ocular e bem-estar. Podemos conversar?"
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
          message: "Cliqueu no botão WhatsApp",
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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="ryv-header shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo-ryv.webp"
                    alt="RYV - Saúde & Visão"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-ryv-dark">RYV</h1>
                    <p className="text-sm text-ryv-dark-lighter">
                      Conectando Saúde & Visão
                    </p>
                  </div>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="ryv-nav-link">
                  Início
                </Link>
                <Link href="/?category=saude-mental" className="ryv-nav-link">
                  Saúde Mental
                </Link>
                <Link href="/?category=otica" className="ryv-nav-link">
                  Ótica
                </Link>
                <Link href="/?category=optometria" className="ryv-nav-link">
                  Optometria
                </Link>
              </nav>

              {/* Contact Button */}
              <div className="flex items-center space-x-4">
                <button onClick={handleWhatsAppClick} className="btn-whatsapp">
                  <PhoneIcon className="h-5 w-5" />
                  Vamos Conversar?
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="ryv-footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <Image
                    src="/logo-ryv.webp"
                    alt="RYV - Saúde & Visão"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <div className="ml-3">
                    <h3 className="text-xl font-bold text-ryv-white">RYV</h3>
                    <p className="text-ryv-secondary">
                      Conectando Saúde & Visão
                    </p>
                  </div>
                </div>
                <p className="text-ryv-secondary mb-4">
                  Somos uma equipe apaixonada por conectar pessoas com os
                  melhores cuidados para sua visão e bem-estar mental.
                  Acreditamos que saúde ocular e mental caminham juntas para uma
                  vida mais plena e conectada.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="btn-whatsapp"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Conecte-se Conosco
                  </button>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-ryv-white">
                  Como Podemos Ajudar
                </h4>
                <ul className="space-y-2 text-ryv-secondary">
                  <li>Exames Oftalmológicos</li>
                  <li>Óculos e Lentes</li>
                  <li>Lentes de Contato</li>
                  <li>Óculos de Sol</li>
                  <li>Consultoria em Saúde Ocular</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-ryv-white">
                  Vamos Conversar?
                </h4>
                <div className="space-y-2 text-ryv-secondary">
                  <p>📍 Rua das Flores, 123</p>
                  <p>📞 (11) 99654-8560</p>
                  <p>✉️ suporte@ryv.com.br</p>
                  <p>🕒 Seg-Sex: 8h-18h</p>
                </div>
              </div>
            </div>

            <div className="border-t border-ryv-dark-light mt-8 pt-8 text-center text-ryv-secondary">
              <p>
                &copy; 2024 RYV - Conectando Saúde & Visão. Todos os direitos
                reservados.
              </p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-ryv-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          aria-label="Conecte-se via WhatsApp"
        >
          <PhoneIcon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Layout;
