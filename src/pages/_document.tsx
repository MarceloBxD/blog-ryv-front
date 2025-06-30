import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Meta Tags Básicas */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="RYV - Conectando saúde mental e visão. Descubra como cuidar da sua visão pode transformar sua saúde mental. Especialistas em óptica e bem-estar emocional."
        />
        <meta
          name="keywords"
          content="saúde mental, visão, óptica, bem-estar, oftalmologia, saúde ocular, RYV, conexão mente-corpo"
        />
        <meta name="author" content="RYV" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ryv.com.br/" />
        <meta
          property="og:title"
          content="RYV - Conectando Saúde Mental e Visão"
        />
        <meta
          property="og:description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Somos especialistas em conectar esses dois mundos para uma vida mais plena."
        />
        <meta
          property="og:image"
          content="https://ryv.com.br/mental-health-illustration.svg"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:site_name" content="RYV" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ryv.com.br/" />
        <meta
          property="twitter:title"
          content="RYV - Conectando Saúde Mental e Visão"
        />
        <meta
          property="twitter:description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Somos especialistas em conectar esses dois mundos para uma vida mais plena."
        />
        <meta
          property="twitter:image"
          content="https://ryv.com.br/mental-health-illustration.svg"
        />

        {/* Favicon e Ícones */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-ryv.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-ryv.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-ryv.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://ryv.com.br/" />

        {/* Sitemap */}
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />

        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

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
              description:
                "Conectando saúde mental e visão para uma vida mais plena",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Portuguese",
              },
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
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
