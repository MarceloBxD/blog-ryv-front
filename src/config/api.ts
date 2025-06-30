export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  CREATE_ADMIN: `${API_BASE_URL}/api/auth/create-admin`,

  // Articles
  ARTICLES: `${API_BASE_URL}/api/articles`,
  ARTICLE_BY_SLUG: (slug: string) => `${API_BASE_URL}/api/articles/${slug}`,
  CATEGORIES: `${API_BASE_URL}/api/articles/categories`,
  DAILY_RECOMMENDATION: `${API_BASE_URL}/api/articles/daily-recommendation`,

  // Admin Articles
  ADMIN_ARTICLES: `${API_BASE_URL}/api/admin/articles`,
  ADMIN_ARTICLE_BY_ID: (id: number) =>
    `${API_BASE_URL}/api/admin/articles/${id}`,

  // WhatsApp
  WHATSAPP_CONTACT: `${API_BASE_URL}/api/whatsapp/contact`,
  ADMIN_WHATSAPP_CONTACTS: `${API_BASE_URL}/api/admin/whatsapp/contacts`,
  ADMIN_WHATSAPP_STATS: `${API_BASE_URL}/api/admin/whatsapp/stats`,
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Função para fazer requisições com tratamento de erro
export const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso não encontrado");
      } else if (response.status === 401) {
        throw new Error("Não autorizado");
      } else if (response.status === 403) {
        throw new Error("Acesso negado");
      } else {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição API:", error);
    throw error;
  }
};
