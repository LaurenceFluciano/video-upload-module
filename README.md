# Video Upload Component

Componente responsável por orquestrar o processo de upload de vídeos, aplicando regras de negócio e delegando a geração de URLs de upload para serviços externos.

Ele define quem pode fazer upload e como esse upload será realizado, retornando uma URL para que o cliente (frontend) envie o arquivo diretamente.

## Objetivo

- Controlar permissões de upload (ex: plano do usuário)
- Isolar integrações externas (YouTube, Supabase, etc.)
- Centralizar regras de negócio relacionadas ao upload
- Permitir fácil substituição de provedores

## Como funciona

1. O cliente solicita um upload
2. O sistema valida regras de negócio
3. Um provider é utilizado para gerar a URL de upload
4. A URL é retornada ao cliente
5. O upload do arquivo é feito diretamente pelo frontend
6. Após o sucesso do upload, ele retornará um id que deve ser enviado para o dominio novamente

## Características:

- Baixo acoplamento entre regras e integrações
- Componentes de infraestrutura isolados
- Arquitetura preparada para múltiplos providers
- Foco em simplicidade e extensibilidade


# Execução do servidor:

```
deno task start
```

# Observação

Este componente prioriza controle de dependências e isolamento de integrações externas, mantendo a lógica de negócio independente de detalhes de implementação. Diante desse cenário, é possível utilizar o componente em qualquer dominio, não precisando executar esse servidor de testes.