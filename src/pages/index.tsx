import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import NewsSwiper from "../components/NewsSwiper";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>RYV - Conectando Saúde Mental e Visão | Blog Oficial</title>
        <meta
          name="description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica, bem-estar e conexão mente-corpo."
        />
        <meta
          name="keywords"
          content="saúde mental, visão, óptica, bem-estar, oftalmologia, saúde ocular, RYV, blog, conexão mente-corpo"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="RYV - Conectando Saúde Mental e Visão"
        />
        <meta
          property="og:description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica e bem-estar."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ryv.com.br/" />
        <meta
          property="og:image"
          content="https://ryv.com.br/husky-oculos.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="RYV - Conectando Saúde Mental e Visão"
        />
        <meta
          name="twitter:description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica e bem-estar."
        />
        <meta
          name="twitter:image"
          content="https://ryv.com.br/husky-oculos.webp"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://ryv.com.br/" />
      </Head>

      <div className="min-h-screen bg-background text-primary">
        <Header />
        <main className="pt-16">
          <HeroSection />
          <NewsSwiper />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
