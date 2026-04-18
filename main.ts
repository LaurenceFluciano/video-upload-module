import { Hono } from 'hono'
import { swaggerUI } from 'jsr:@hono/swagger-ui'
import { provideCodeHandler } from "./src/infra/controller/video.upload.provider.controller.ts";
import { confirmHandler } from "./src/infra/controller/video.confirm.controller.ts";
import { getUserVideosHandler } from "./src/infra/controller/video.query.controller.ts";
import { openApiSpec } from "./src/infra/controller/openapi.ts";

const app = new Hono()

// Rotas
app.post('/video/upload/provide-code/', provideCodeHandler)
app.post('/video/upload/confirm/', confirmHandler)
app.get('/users/:userId/videos', getUserVideosHandler)

// Doc
app.get('/swagger-json', (c) => c.json(openApiSpec))
app.get('/docs', swaggerUI({ url: '/swagger-json' }))
app.get('/', (c) => c.redirect('/docs'))

Deno.serve(app.fetch)