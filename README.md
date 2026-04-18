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

# Arquitetura e Fluxos

Para entender a fundo a lógica de cada componente, acesse as especificações técnicas abaixo:

- [Especificação de Provedores de Upload](./docs/Video%20Upload%20Provider.md): Detalhes sobre o VideoUploadProviderContext e a estratégia de upload via providers externos.

- [Especificação de Confirmação de Video](./docs/Video%20Confirm.md): Documentação sobre o VideoConfirm, o fluxo de validação de posse e a garantia de consistência atômica com o provedor.

# Execução do servidor:

```
deno task start
```

# Observação

Este componente prioriza controle de dependências e isolamento de integrações externas, mantendo a lógica de negócio independente de detalhes de implementação. Diante desse cenário, é possível utilizar o componente em qualquer dominio, não precisando executar esse servidor de testes.

# Documentação de provedores externos

Consulte a [Documentação da API do YouTube](https://developers.google.com/youtube/v3)

## Roadmap de Melhorias (Backlog)

Abaixo estão as evoluções planejadas para elevar a maturidade do componente:

- Refinamento de Input: Validar títulos e descrições (tamanho, caracteres especiais) antes de iniciar o handshake com o provedor.

- Resiliência de Erros: Implementar o Either Error Pattern para substituir o uso de throw por retornos tipados, tornando a gestão de falhas explícita em tempo de compilação.

- Observabilidade: Injetar camadas de log por requisição para monitorar latência e taxa de sucesso das integrações com APIs de terceiros.

- Escalabilidade de Query: Implementar paginação baseada em Cursor no VideoQuery para garantir performance estável em coleções de dados massivas.

