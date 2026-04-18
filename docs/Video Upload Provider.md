# Componente de geração de URL pra upload do arquivo do video

Esse componente tem como objetivo garantir um código de url que permite o front-end realizar upload. O objetivo desse componente é permitir que o backend de dominio ou resource server não permita que qualquer usuário possa ter acesso a upload de videos na aplicação.

ATENÇÃO: O controle de papeis e permissões não estão inclusos nesse componente, isso é responsabilidade do dominio da aplicação.

## Aspectos positivos da arquitetura:

Temos uma interface `VideoUploadProvider` que possibilita que multiplos providers de upload como `supabase`, `youtube`, etc. Sejam implementados. A estabilidade do componente é máxima pois teremos N componentes dependendo da interface, tornando-o imútavel. 

Temos um `VideoUploadProviderContext` responsável por aplicar as Regras de Negócio e validações nos campos enviados pela requisição.

Adicionar um novo provider é muito facil, basta adicionar uma nova classe concreta que implementa a a interface `VideoUploadProvider`.

## Exemplo de uso

Para utilizar o componente é muito simples basta executar o seguinte código:

```ts
import { VideoUploadProviderContext } from "./video.upload.context";
import { YoutubeVideoUploadProvider } from "./youtube.video.upload.provider";

const context = new VideoUploadProviderContext(new YoutubeVideoUploadProvider())

context.process({
    title: "Hello World",
    description: "A simple video",
    videoMetada: {
        type: "mp4",
        size: 5000
    }
})
```

## Análise de Componentes

Esta seção avalia os principais componentes do sistema utilizando métricas clássicas de acoplamento e abstração propostas por Robert C. Martin.

### Métricas Utilizadas

#### Instabilidade (I)

Mede o quão suscetível um componente é a mudanças.

I= Fan-out / (Fan-in + Fan-out)

Fan-in → número de componentes que dependem dele
Fan-out → número de dependências externas

## Componentes Analisados

Estrutura simplificada:

```
VideoUploadProvider (interface)
 ├── YouTubeProvider
 └── SupabaseProvider
 └── OtherProvider
```

### 1. VideoUploadProvider

- Tipo: Interface
- Responsabilidade: definir contrato de upload
- Dependências: Não possui dependências de infraestrutura ou execução, dependendo apenas de tipos estruturais, logo seu Fan-out = 0.
- Dependentes: Todos os componentes responsáveis por gerar um código ou URL para upload do arquivo video, no momento atual temos apenas 1 classe dependente (Fan-in), mas poderiamos ter mais.

#### Cálculo

Fan-in = 1
Fan-out = 0

I = 0/(0+2)= 0

- Interpretação: Componente altamente estável
