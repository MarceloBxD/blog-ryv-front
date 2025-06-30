import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao parsear dados do usuário:", error);
        logout();
      }
    } else {
      // Se não há token e não estamos na página de login, redirecionar
      if (
        router.pathname.startsWith("/admin") &&
        router.pathname !== "/admin/login"
      ) {
        router.push("/admin/login");
      }
    }
    setLoading(false);
  }, [router.pathname]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    router.push("/admin/login");
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    logout,
  };
}
