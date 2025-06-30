// Configuração do Google AdSense
export const ADS_CONFIG = {
  // Substitua pelo seu Publisher ID do Google AdSense
  PUBLISHER_ID: "ca-pub-YOUR_PUBLISHER_ID",

  // IDs dos slots de anúncios
  AD_SLOTS: {
    BANNER_TOP: "banner-top-slot",
    BANNER_BOTTOM: "banner-bottom-slot",
    SIDEBAR: "sidebar-slot",
    IN_ARTICLE: "in-article-slot",
    STICKY: "sticky-slot",
    ARTICLE_TOP: "article-top-slot",
    ARTICLE_BOTTOM: "article-bottom-slot",
  },

  // Configurações de formato
  AD_FORMATS: {
    BANNER: {
      width: 728,
      height: 90,
      responsive: true,
    },
    SIDEBAR: {
      width: 300,
      height: 600,
      responsive: true,
    },
    IN_ARTICLE: {
      width: 300,
      height: 250,
      responsive: true,
    },
    STICKY: {
      width: 320,
      height: 100,
      responsive: true,
    },
  },

  // Configurações de posicionamento
  POSITIONS: {
    HEADER: "header",
    FOOTER: "footer",
    SIDEBAR: "sidebar",
    CONTENT_TOP: "content-top",
    CONTENT_MIDDLE: "content-middle",
    CONTENT_BOTTOM: "content-bottom",
    STICKY: "sticky",
  },
};

// Configuração do Google Analytics
export const ANALYTICS_CONFIG = {
  // Substitua pelo seu Measurement ID do Google Analytics
  MEASUREMENT_ID: "GA_MEASUREMENT_ID",

  // Eventos personalizados
  EVENTS: {
    ARTICLE_READ: "article_read",
    ARTICLE_LIKED: "article_liked",
    ARTICLE_SHARED: "article_shared",
    WHATSAPP_CLICK: "whatsapp_click",
    RECOMMENDATION_CLICK: "recommendation_click",
    GAMIFICATION_ACHIEVEMENT: "gamification_achievement",
  },
};

// Configuração de monetização
export const MONETIZATION_CONFIG = {
  // Taxa de exibição de anúncios (0-1)
  AD_DISPLAY_RATE: 0.8,

  // Intervalo mínimo entre anúncios (em segundos)
  MIN_AD_INTERVAL: 30,

  // Máximo de anúncios por página
  MAX_ADS_PER_PAGE: 4,

  // Anúncios por categoria de conteúdo
  ADS_BY_CATEGORY: {
    "Saúde Mental": 2,
    Ótica: 2,
    Optometria: 2,
    "Dicas de Saúde": 2,
  },
};

// Função para verificar se o usuário aceitou cookies
export const hasAcceptedCookies = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "accepted";
};

// Função para verificar se deve mostrar anúncios
export const shouldShowAds = (): boolean => {
  if (typeof window === "undefined") return false;

  // Verificar se cookies foram aceitos
  if (!hasAcceptedCookies()) return false;

  // Verificar se não está em modo de desenvolvimento
  if (process.env.NODE_ENV === "development") return false;

  // Verificar se não é um bot
  const userAgent = navigator.userAgent.toLowerCase();
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  if (isBot) return false;

  return true;
};

// Função para carregar script do Google AdSense
export const loadAdSense = (): void => {
  if (typeof window === "undefined") return;

  // Verificar se já foi carregado
  if ((window as any).adsbygoogle) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.PUBLISHER_ID}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
};

// Função para carregar script do Google Analytics
export const loadAnalytics = (): void => {
  if (typeof window === "undefined") return;

  // Verificar se já foi carregado
  if ((window as any).gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Configurar gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag("js", new Date());
  gtag("config", ANALYTICS_CONFIG.MEASUREMENT_ID);
};

// Função para rastrear eventos
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (typeof window === "undefined") return;

  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, parameters);
  }

  // Log local para desenvolvimento
  if (process.env.NODE_ENV === "development") {
    console.log("Event tracked:", eventName, parameters);
  }
};
