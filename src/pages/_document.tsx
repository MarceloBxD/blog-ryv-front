import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Google Fonts - Cormorant Garamond */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Meta tags para SEO */}
        <meta
          name="description"
          content="RYV - Conectando Saúde Mental e Visão. Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog especializado em óptica, bem-estar e conexão mente-corpo."
        />
        <meta
          name="keywords"
          content="saúde mental, visão, óptica, bem-estar, oftalmologia, saúde ocular, RYV, blog, conexão mente-corpo, lentes, óculos"
        />
        <meta name="author" content="RYV" />
        <meta name="robots" content="index, follow" />

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
        <meta property="og:site_name" content="RYV Blog" />

        {/* Twitter Cards */}
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

        {/* Canonical URL */}
        <link rel="canonical" href="https://ryv.com.br/" />

        {/* Favicon */}
        <link rel="icon" type="image/webp" href="/mental.webp" />
        <link rel="apple-touch-icon" href="/mental.webp" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RYV",
              url: "https://ryv.com.br",
              logo: "https://ryv.com.br/logo-ryv.webp",
              description: "Conectando Saúde Mental e Visão",
              sameAs: ["https://instagram.com/ryv", "https://facebook.com/ryv"],
            }),
          }}
        />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8505875581417099"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
