# ♿️ Portal PCD - Informação, Inclusão e Acessibilidade
 
Bem-vindo ao Portal PCD, um espaço dedicado a fornecer informações e recursos importantes para pessoas com deficiência (PCD). Nosso objetivo é promover a inclusão e a acessibilidade através de um acesso fácil a serviços, direitos e informações relevantes.
 
## ⚙️ Como Funciona o Projeto
 
Este projeto é construído utilizando o framework **Next.js**, o que proporciona uma experiência de usuário rápida e otimizada. Aqui está um resumo das principais funcionalidades e como elas operam:
 
### 🔒 Autenticação de Usuário
 
O sistema implementa um fluxo de autenticação simples utilizando `localStorage` para armazenar informações dos usuários e cookies para manter a sessão ativa.
 
1.  **Cadastro (`/cad-user`)**:
    * Permite que novos usuários criem uma conta fornecendo nome, e-mail e senha.
    * Ao cadastrar, um token único é gerado para o usuário.
    * Os dados do usuário (incluindo o token) são armazenados no `localStorage` do navegador.
    * **Importante:** Este é um sistema de autenticação básico para fins de demonstração e não deve ser utilizado em produção sem medidas de segurança adicionais.
 
2.  **Login (`/login`)**:
    * Usuários existentes podem fazer login inserindo seu e-mail e senha.
    * Se as credenciais estiverem corretas, um cookie de sessão (`token`) é criado no navegador.
    * Após o login bem-sucedido, o usuário é redirecionado para a página inicial (`/home`).
 
3.  **Proteção de Rotas**:
    * As páginas `/home`, `/listagem`, `/listagem/[servico]` e `/update` são protegidas.
    * A função `getUsuarioAutenticado` (em `src/lib/auth.ts`) verifica a presença do token no cookie para determinar se o usuário está autenticado.
    * Se um usuário não autenticado tentar acessar essas páginas, ele será automaticamente redirecionado para a página de login.
 
4.  **Logout (implícito)**:
    * Atualmente, não há um botão de logout explícito no código fornecido. A sessão é gerenciada pelo cookie `token`, que expira após 24 horas (`max-age=86400` segundos). O usuário também pode limpar os cookies do navegador para sair.
 
### 🏠 Página Inicial (`/`)
 
* É a página de entrada do portal.
* Verifica se há um token de autenticação no cookie.
* Se um token válido for encontrado, o usuário é automaticamente redirecionado para a página `/home`.
* Caso contrário, exibe uma tela de boas-vindas com botões para fazer login ou cadastrar-se.
 
### 🗺️ Listagem de Serviços (`/listagem`)
 
* Exibe uma lista de categorias de serviços relevantes para o público PCD (Saúde, Benefícios, Emprego, etc.).
* Acesso restrito a usuários autenticados.
* Ao clicar em um serviço, o usuário é levado a uma página específica daquele serviço (`/listagem/[id]`).
 
### 📰 Detalhes do Serviço (`/listagem/[servico]`)
 
* Exibe informações detalhadas sobre a categoria de serviço selecionada.
* As informações são estáticas e definidas no objeto `conteudos` dentro da página.
* Acesso restrito a usuários autenticados.
 
### 👤 Área do Usuário (`/update`)
 
* Permite que usuários autenticados visualizem e atualizem seus dados de cadastro (nome, e-mail e senha).
* As alterações são salvas no `localStorage`.
 
### ⚙️ Configuração e Estilos
 
* **`next.config.ts`**: Arquivo de configuração do Next.js.
* **`postcss.config.js` e `tailwind.config.ts`**: Configurações para o Tailwind CSS, um framework de estilização utilitário.
* **`globals.css`**: Arquivos CSS globais, importando Tailwind e definindo estilos básicos.
* **Fontes**: Utiliza as fontes Geist Sans e Geist Mono para a interface.
 
### 📚 Biblioteca (`/lib`)
 
* **`auth.ts`**: Contém funções relacionadas à autenticação, como `getTokenFromCookies` e `getUsuarioAutenticado`.
 
## 🚀 Como Entrar no Projeto
 
Para executar este projeto localmente, siga os passos abaixo:
 
1.  **Pré-requisitos:**
    * **Node.js** (versão 18.x ou superior recomendada). Você pode verificar sua versão com o comando `node -v`.
    * **npm** ou **yarn** (gerenciadores de pacotes do Node.js). Geralmente instalados com o Node.js.
 
2.  **Clonar o Repositório:**
    * Se você tiver o código em um repositório Git (como GitHub, GitLab ou Bitbucket), clone-o para sua máquina local utilizando o comando:
        ```bash
        git clone [URL_DO_REPOSITÓRIO]
        cd [NOME_DO_PROJETO]
        ```
 
3.  **Instalar as Dependências:**
    * Dentro do diretório do projeto, execute o seguinte comando para instalar todas as bibliotecas e dependências necessárias (incluindo Next.js, React, Tailwind CSS, etc.):
        ```bash
        npm install
        # ou
        yarn install
        ```
 
4.  **Executar o Projeto em Modo de Desenvolvimento:**
    * Após a instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento do Next.js:
        ```bash
        npm run dev
        # ou
        yarn dev
        ```
    * Isso iniciará o servidor na porta padrão `3000`. Abra seu navegador e acesse `http://localhost:3000` para ver o Portal PCD em execução.
 ✨😊