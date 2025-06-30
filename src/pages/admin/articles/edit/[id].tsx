import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import AdminLayout from "../../../../components/AdminLayout";

interface Category {
  id: number;
  name: string;
}

interface ArticleForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: number;
  status: string;
}

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(true);
  const [formData, setFormData] = useState<ArticleForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: 0,
    status: "draft",
  });

  useEffect(() => {
    if (id) {
      fetchCategories();
      fetchArticle();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/articles/categories"
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchArticle = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const article = await response.json();
        setFormData({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          category_id: article.category_id,
          status: article.status,
        });
      } else {
        alert("Artigo não encontrado");
        router.push("/admin/articles");
      }
    } catch (error) {
      console.error("Erro ao carregar artigo:", error);
      alert("Erro ao carregar artigo");
      router.push("/admin/articles");
    } finally {
      setArticleLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:3001/api/admin/articles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        router.push("/admin/articles");
      } else {
        const error = await response.json();
        alert(error.message || "Erro ao atualizar artigo");
      }
    } catch (error) {
      console.error("Erro ao atualizar artigo:", error);
      alert("Erro ao atualizar artigo");
    } finally {
      setLoading(false);
    }
  };

  if (categoriesLoading || articleLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Editar Artigo">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout title="Editar Artigo">
        <div className="max-w-4xl mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Editar Artigo
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Atualize as informações do artigo abaixo.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    {/* Título */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.title}
                        onChange={handleTitleChange}
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Slug (URL)
                      </label>
                      <input
                        type="text"
                        name="slug"
                        id="slug"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.slug}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Categoria */}
                    <div>
                      <label
                        htmlFor="category_id"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Categoria
                      </label>
                      <select
                        name="category_id"
                        id="category_id"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.category_id}
                        onChange={handleChange}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                      </select>
                    </div>

                    {/* Resumo */}
                    <div>
                      <label
                        htmlFor="excerpt"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Resumo
                      </label>
                      <textarea
                        name="excerpt"
                        id="excerpt"
                        rows={3}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.excerpt}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Conteúdo */}
                    <div>
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Conteúdo
                      </label>
                      <textarea
                        name="content"
                        id="content"
                        rows={12}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.content}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/articles")}
                      className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
