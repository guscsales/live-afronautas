# Live Afronautas - CRUD de Usuários

API REST para gerenciamento de usuários desenvolvida com TypeScript, Express, PostgreSQL e Bun.

## 🚀 Tecnologias

- **Runtime**: Bun
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod
- **Containerização**: Docker Compose

## 📦 Estrutura do Projeto

```
src/
├── controllers/     # Controladores das rotas
├── database/        # Configuração do banco e migrations
├── middleware/      # Middlewares customizados
├── routes/          # Definição das rotas
├── schemas/         # Schemas de validação com Zod
└── server.ts        # Arquivo principal do servidor
```

## 🛠️ Como Executar

### Pré-requisitos

- [Bun](https://bun.sh/) instalado
- [Docker](https://www.docker.com/) e Docker Compose

### 1. Instalar dependências

```bash
bun install
```

### 2. Subir o banco de dados

```bash
docker-compose up -d
```

### 3. Executar em modo desenvolvimento

```bash
bun run dev
```

O servidor estará rodando em `http://localhost:3000`

### 4. Testar a API

Use o script de teste incluído:

```bash
./test-api.sh
```

Ou use o arquivo `api-examples.http` com a extensão REST Client do VS Code.

## 📚 Endpoints da API

### Health Check

- `GET /health` - Verificar status da API

### Usuários

| Método | Endpoint         | Descrição                |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/users`     | Listar todos os usuários |
| GET    | `/api/users/:id` | Buscar usuário por ID    |
| POST   | `/api/users`     | Criar novo usuário       |
| PUT    | `/api/users/:id` | Atualizar usuário        |
| DELETE | `/api/users/:id` | Deletar usuário          |

### Exemplos de Uso

#### Criar usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "age": 30
  }'
```

#### Listar usuários

```bash
curl http://localhost:3000/api/users
```

#### Buscar usuário por ID

```bash
curl http://localhost:3000/api/users/1
```

#### Atualizar usuário

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Santos",
    "age": 31
  }'
```

#### Deletar usuário

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## 📋 Schema do Usuário

```typescript
{
  id: number;           // Auto incremento (PK)
  name: string;         // Nome (obrigatório, 2-255 chars)
  email: string;        // Email (obrigatório, único, formato válido)
  age?: number;         // Idade (opcional, 0-120)
  created_at: Date;     // Data de criação (automático)
  updated_at: Date;     // Data de atualização (automático)
}
```

## 🔒 Validações

- **Nome**: Obrigatório, 2-255 caracteres
- **Email**: Obrigatório, formato válido, único
- **Idade**: Opcional, número inteiro entre 0-120

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura:

- PostgreSQL 15
- Dados persistentes em volume
- Script de inicialização automática
- Health check

## 🛡️ Recursos de Segurança

- Helmet.js para headers de segurança
- CORS configurado
- Validação de entrada com Zod
- Tratamento de erros centralizado
- Sanitização de parâmetros

## 📝 Scripts Disponíveis

- `bun run dev` - Desenvolvimento com hot reload
- `bun run build` - Build para produção
- `bun run start` - Executar versão de produção

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/live_afronautas
PORT=3000
NODE_ENV=development
```

## 🎯 Próximos Passos

- [ ] Adicionar testes unitários e de integração
- [ ] Implementar paginação nas listagens
- [ ] Adicionar autenticação JWT
- [ ] Implementar rate limiting
- [ ] Adicionar logs estruturados
- [ ] Documentação com Swagger/OpenAPI
