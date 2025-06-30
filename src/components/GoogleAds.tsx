import React, { useEffect } from "react";

interface GoogleAdsProps {
  adSlot: string;
  adFormat: "banner" | "sidebar" | "in-article" | "sticky";
  className?: string;
}

const GoogleAds: React.FC<GoogleAdsProps> = ({
  adSlot,
  adFormat,
  className = "",
}) => {
  useEffect(() => {
    // Carregar Google AdSense
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (error) {
        console.error("Erro ao carregar anúncio:", error);
      }
    }
  }, []);

  const getAdStyle = () => {
    switch (adFormat) {
      case "banner":
        return "w-full h-[90px] md:h-[250px] bg-gray-100 rounded-lg flex items-center justify-center";
      case "sidebar":
        return "w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center";
      case "in-article":
        return "w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center my-8";
      case "sticky":
        return "fixed bottom-4 right-4 w-[320px] h-[100px] bg-gray-100 rounded-lg flex items-center justify-center z-30";
      default:
        return "w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center";
    }
  };

  const getAdContent = () => {
    return (
      <div className={`${getAdStyle()} ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-sm font-medium mb-1">Anúncio</div>
          <div className="text-xs">Google AdSense</div>
        </div>
      </div>
    );
  };

  // Estrutura para Google AdSense
  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Substitua pelo seu ID
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {getAdContent()}
    </div>
  );
};

// Componentes específicos para diferentes tipos de anúncios
export const BannerAd: React.FC = () => (
  <GoogleAds adSlot="banner-ad-slot" adFormat="banner" />
);

export const SidebarAd: React.FC = () => (
  <GoogleAds adSlot="sidebar-ad-slot" adFormat="sidebar" />
);

export const InArticleAd: React.FC = () => (
  <GoogleAds adSlot="in-article-ad-slot" adFormat="in-article" />
);

export const StickyAd: React.FC = () => (
  <GoogleAds adSlot="sticky-ad-slot" adFormat="sticky" />
);

export default GoogleAds;
