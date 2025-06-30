# Painel Administrativo RYV

Este é o painel administrativo completo para gerenciar o blog RYV, incluindo artigos e contatos do WhatsApp.

## Funcionalidades

### 🔐 Autenticação

- **Login**: `/admin/login` - Página de login para administradores
- **Proteção de rotas**: Todas as páginas administrativas são protegidas
- **Logout**: Botão de logout na sidebar

### 📊 Dashboard

- **URL**: `/admin/dashboard`
- Estatísticas gerais (total de artigos e contatos)
- Lista dos artigos mais recentes
- Lista dos contatos mais recentes
- Links rápidos para outras seções

### 📝 Gerenciamento de Artigos

- **Listagem**: `/admin/articles` - Lista todos os artigos com opções de editar/excluir
- **Criar**: `/admin/articles/new` - Formulário para criar novo artigo
- **Editar**: `/admin/articles/edit/[id]` - Formulário para editar artigo existente

#### Funcionalidades dos Artigos:

- ✅ Criar novos artigos
- ✅ Editar artigos existentes
- ✅ Excluir artigos
- ✅ Gerenciar status (rascunho/publicado)
- ✅ Selecionar categorias
- ✅ Geração automática de slug baseado no título
- ✅ Campos: título, slug, resumo, conteúdo, categoria, status

### 📱 Contatos WhatsApp

- **URL**: `/admin/whatsapp`
- Lista todos os contatos recebidos via WhatsApp
- Informações: nome, telefone, mensagem, data/hora
- Botão para responder diretamente no WhatsApp

## Como Usar

### 1. Primeiro Acesso

1. Acesse `http://localhost:3000/admin/login`
2. Use as credenciais do administrador criado na API
3. Após o login, você será redirecionado para o dashboard

### 2. Criar um Artigo

1. No dashboard, clique em "Novo Artigo" ou acesse `/admin/articles/new`
2. Preencha todos os campos obrigatórios:
   - **Título**: O título do artigo (slug será gerado automaticamente)
   - **Slug**: URL amigável (pode ser editado manualmente)
   - **Categoria**: Selecione uma categoria existente
   - **Status**: Rascunho ou Publicado
   - **Resumo**: Breve descrição do artigo
   - **Conteúdo**: Conteúdo completo do artigo
3. Clique em "Criar Artigo"

### 3. Editar um Artigo

1. Na listagem de artigos (`/admin/articles`), clique em "Editar"
2. Modifique os campos desejados
3. Clique em "Salvar Alterações"

### 4. Excluir um Artigo

1. Na listagem de artigos, clique em "Excluir"
2. Confirme a exclusão no popup
3. O artigo será removido permanentemente

### 5. Gerenciar Contatos WhatsApp

1. Acesse `/admin/whatsapp`
2. Visualize todos os contatos recebidos
3. Clique em "Responder" para abrir o WhatsApp com uma mensagem pré-formatada

## Estrutura de Arquivos

```
src/
├── components/
│   ├── AdminLayout.tsx          # Layout principal do admin
│   └── ProtectedRoute.tsx       # Componente de proteção de rotas
├── hooks/
│   └── useAuth.ts              # Hook para autenticação
├── config/
│   └── api.ts                  # Configuração da API
└── pages/admin/
    ├── login.tsx               # Página de login
    ├── dashboard.tsx           # Dashboard principal
    ├── articles/
    │   ├── index.tsx           # Listagem de artigos
    │   ├── new.tsx             # Criar artigo
    │   └── edit/[id].tsx       # Editar artigo
    └── whatsapp/
        └── index.tsx           # Contatos WhatsApp
```

## Tecnologias Utilizadas

- **Next.js**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **React Hooks**: Gerenciamento de estado
- **Local Storage**: Persistência de autenticação

## Configuração da API

O painel se conecta com a API Go na porta 3001. Certifique-se de que:

1. A API está rodando em `http://localhost:3001`
2. As rotas da API estão configuradas corretamente
3. O CORS está configurado para permitir requisições do frontend

## Endpoints Utilizados

### Autenticação

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/create-admin` - Criar admin

### Artigos (Público)

- `GET /api/articles` - Listar artigos
- `GET /api/articles/categories` - Listar categorias
- `GET /api/articles/:slug` - Buscar artigo por slug

### Artigos (Admin)

- `POST /api/admin/articles` - Criar artigo
- `PUT /api/admin/articles/:id` - Atualizar artigo
- `DELETE /api/admin/articles/:id` - Excluir artigo

### WhatsApp (Admin)

- `GET /api/admin/whatsapp/contacts` - Listar contatos
- `GET /api/admin/whatsapp/stats` - Estatísticas

## Segurança

- Todas as rotas administrativas são protegidas
- Tokens JWT são armazenados no localStorage
- Redirecionamento automático para login se não autenticado
- Headers de autorização em todas as requisições

## Responsividade

O painel é totalmente responsivo e funciona em:

- Desktop (sidebar fixa)
- Tablet (sidebar colapsável)
- Mobile (sidebar em overlay)

## Próximas Melhorias

- [ ] Editor de texto rico (WYSIWYG)
- [ ] Upload de imagens
- [ ] Preview de artigos
- [ ] Filtros e busca
- [ ] Paginação
- [ ] Notificações em tempo real
- [ ] Backup automático
- [ ] Logs de atividades
