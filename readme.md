# SISOBRA - Sistema de Obras de Pindamonhangaba

Sistema de visualização e gerenciamento de dados de obras da cidade de Pindamonhangaba, desenvolvido com Next.js 15, TypeScript, Drizzle ORM e PostgreSQL.

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
- **npm** ou **yarn** (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🚀 Configuração do Ambiente

### 1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd Pindamonhangaba.SISOBRA/src
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL

#### 3.1. Crie o banco de dados
```sql
-- Conecte ao PostgreSQL como superusuário
CREATE DATABASE sisobra_pref;
CREATE USER sisobra_user WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE sisobra_pref TO sisobra_user;
```

#### 3.2. Execute o script de criação das tabelas
Execute o arquivo `database_structure/estrutura_postgresql.sql` no seu banco:

```bash
# Usando psql
psql -U sisobra_user -d sisobra_pref -f database_structure/estrutura_postgresql.sql

# Ou através do pgAdmin, importando o arquivo SQL
```

### 4. Configure as variáveis de ambiente

#### 4.1. Copie o arquivo de exemplo
```bash
# Windows
copy .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

#### 4.2. Edite o arquivo `.env.local`
```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sisobra_pref
DB_USER=sisobra_user
DB_PASSWORD=sua_senha_segura
DB_SSL=false

# Configurações da Aplicação
NEXT_PUBLIC_APP_NAME=SISOBRA - Visualização de Dados
NODE_ENV=development
```

### 5. Sincronize o schema do banco (opcional)
```bash
# Aplicar schemas do Drizzle ao banco existente
npm run db:push
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:3000`

### Produção
```bash
# Build da aplicação
npm run build

# Iniciar em produção
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js 15
│   ├── api/               # API Routes
│   │   └── prefeituras/   # Endpoints de prefeituras
│   ├── components/        # Componentes React
│   │   └── Navigation.tsx # Menu de navegação
│   ├── db/               # Configuração do banco
│   │   ├── config.ts     # Configuração Drizzle
│   │   ├── queries/      # Queries do banco
│   │   └── schema/       # Schemas do Drizzle
│   ├── prefeituras/      # Página de prefeituras
│   └── globals.css       # Estilos globais
├── database_structure/    # Scripts SQL do banco
├── .env.example          # Exemplo de variáveis de ambiente
└── drizzle.config.ts     # Configuração do Drizzle Kit
```

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa o linter |
| `npm run db:generate` | Gera migrações do Drizzle |
| `npm run db:migrate` | Aplica migrações |
| `npm run db:push` | Sincroniza schema com banco |
| `npm run db:studio` | Abre Drizzle Studio |

## 🔧 Funcionalidades

### ✅ Implementadas
- [x] Visualização de prefeituras cadastradas
- [x] Busca por nome de prefeitura
- [x] Interface responsiva com Tailwind CSS
- [x] Conexão com PostgreSQL via Drizzle ORM
- [x] API REST para consultas

### 🚧 Em Desenvolvimento
- [ ] Visualização de obras
- [ ] Relatórios de habite-se
- [ ] Consulta de responsáveis
- [ ] Dashboard com estatísticas
- [ ] Filtros avançados

## 📊 Banco de Dados

O sistema utiliza as seguintes tabelas principais:

- **prefeitura** - Dados das prefeituras
- **obra** - Informações das obras
- **habitese** - Habite-se emitidos
- **responsavel** - Responsáveis técnicos
- **usuarios** - Usuários do sistema
- **tab_*** - Tabelas auxiliares (CEP, municípios, etc.)

## 🔍 Testando a Aplicação

### 1. Teste de configuração
Acesse: `http://localhost:3000/api/test-config`
- Verifica se as variáveis de ambiente estão corretas

### 2. Teste de conectividade
Acesse: `http://localhost:3000/api/check-tables`
- Lista as tabelas disponíveis no banco

### 3. Teste da API de prefeituras
Acesse: `http://localhost:3000/api/prefeituras`
- Retorna dados das prefeituras em JSON

### 4. Interface de prefeituras
Acesse: `http://localhost:3000/prefeituras`
- Interface visual para consulta de prefeituras

## 🚨 Solução de Problemas

### Erro: "relation does not exist"
- Verifique se o banco foi criado corretamente
- Execute o script SQL de criação das tabelas
- Confirme os nomes das tabelas no pgAdmin

### Erro: "client password must be a string"
- Verifique se `DB_PASSWORD` está definida no `.env.local`
- Certifique-se de que a senha não contém caracteres especiais sem aspas
- Teste a conexão diretamente no PostgreSQL

### Erro de conexão com banco
- Confirme se o PostgreSQL está rodando
- Verifique host, porta e credenciais
- Teste conectividade: `psql -h localhost -U sisobra_user -d sisobra_pref`

### Variáveis de ambiente não carregadas
- Arquivo deve ser `.env.local` na raiz do projeto (src/)
- Reinicie o servidor após alterações
- Verifique sintaxe (sem espaços ao redor do =)

## 🔐 Segurança

- ⚠️ **Nunca** commite arquivos `.env.local` ou credenciais
- Use senhas fortes em produção
- Configure SSL para ambiente de produção
- Mantenha dependências atualizadas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Prefeitura de Pindamonhangaba.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido para a Prefeitura de Pindamonhangaba** 🏛️
