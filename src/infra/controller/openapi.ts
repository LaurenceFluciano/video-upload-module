export const openApiSpec = {
    openapi: "3.0.0",
    info: {
      title: "Component Video Test API",
      version: "1.0.0",
      description: "Componente de upload e gestão de vídeos"
    },
    paths: {
      "/video/upload/provide-code/": {
        post: { summary: "Inicia o processo de upload e gera URL do provider" }
      },
      "/video/upload/confirm/": {
        post: { summary: "Confirma a conclusão do upload no banco de dados" }
      },
      "/users/{userId}/videos": {
        get: { 
          summary: "Lista todos os vídeos de um usuário específico",
          parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }]
        }
      }
    }
  }