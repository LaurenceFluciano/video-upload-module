# Componente de validação do código do video enviado pelo Front-end

Antes de adicionar o código do video na nossa base de dados, é essencial garantir que ele foi gerado pelo dominio da aplicação garantindo que os vídeos adicionados na plataforma sejam autênticos e vinculados à intenção original do usuário.

# Arquitetura do Fluxo de Validação

## 1. A Interface: VideoUploadValidator

Esta é a nossa fronteira de abstração. Ela define o contrato de integridade: "Não importa o provedor, você deve ser capaz de atestar a validade deste código".

- O Valor: Protege o Caso de Uso contra mudanças em APIs externas. Se o YouTube alterar sua versão de API ou se trocarmos de provedor, as regras de negócio permanecem intactas.

## 2. O Provider: YoutubeVideoUploadValidator

Aqui reside a implementação técnica e o consumo da infraestrutura externa (API v3 do YouTube).

- Ação: Comunica-se com os servidores do Google, verifica a existência do videoCode e valida se o vídeo pertence à conta autenticada via Access Token.

- O Valor: Isola a complexidade de rede, autenticação OAuth2 e tratamento de erros de terceiros em um único componente especializado.

## 3. A Factory: VideoUploadValidatorFactory

Atua como o Cérebro de Distribuição e garante o polimorfismo do sistema.

- Ação: Resolve dinamicamente qual implementação de validação deve ser instanciada com base no provedor definido no DTO de entrada.

- O Valor: Permite escalabilidade horizontal. Adicionar suporte ao S3, Vimeo ou Cloudflare Stream torna-se uma tarefa de apenas adicionar uma nova linha na Factory e criar o respectivo Provider.

## 4. O Caso de Uso: VideoConfirm

O Maestro da Operação. Ele orquestra a lógica de transição de estado do vídeo.

### Fluxo de Execução:

1. Recupera a "Intenção de Upload" no repositório através do videoId (UUID interno).

2. Aciona o Validator (via Factory) para realizar a prova de posse e existência no mundo externo.

3. Aprovação Final: Caso o sinal seja verde, ele atualiza o status do vídeo para active e vincula o código definitivo.

# Exemplo de uso:

```ts
const validator = VideoUploadValidatorFactory.create("youtube");
const repository = new InMemoryRepository();

const videoConfirm = new VideoConfirm(repository, validator)

videoConfirm.execute({
  videoCode: "Code Example",
  videoId: "uuid example"
})
```

OBS: O repositório `InMemoryRepository` não existe, é apenas um exemplo