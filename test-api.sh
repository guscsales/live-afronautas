#!/bin/bash

# Script para testar a API do CRUD de usuários

echo "🚀 Testando API do CRUD de Usuários"
echo "=================================="

# Health check
echo -e "\n1. Health Check:"
curl -s http://localhost:3000/health | jq '.'

# Listar usuários iniciais
echo -e "\n2. Usuários iniciais:"
curl -s http://localhost:3000/api/users | jq '.'

# Criar novo usuário
echo -e "\n3. Criando novo usuário:"
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste API", "email": "teste@api.com", "age": 25}' | jq '.'

# Listar usuários após criação
echo -e "\n4. Usuários após criação:"
curl -s http://localhost:3000/api/users | jq '.'

# Buscar usuário específico
echo -e "\n5. Buscando usuário ID 1:"
curl -s http://localhost:3000/api/users/1 | jq '.'

# Atualizar usuário
echo -e "\n6. Atualizando usuário ID 1:"
curl -s -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva Atualizado", "age": 31}' | jq '.'

# Teste de validação (deve falhar)
echo -e "\n7. Teste de validação - email inválido (deve falhar):"
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste", "email": "email-inválido", "age": 25}' | jq '.'

echo -e "\n✅ Testes concluídos!"
