import { VideoUploadProviderFactory } from "../../factories/video.upload.provider.factory.ts";
import { VideoUploadProviderContext } from "../../app/video.upload.provider.context.ts";
import { VideoRegister } from "../../app/video.register.ts";
import { SqliteVideoRepository } from "../database/sqlite.video.repository.ts";

export async function provideCodeHandler(c: any) {
  try {
    const body = await c.req.json();

    // Defaulting to youtube for now; factories support multiple providers
    const factory = new VideoUploadProviderFactory();
    const provider = factory.create("youtube");
    const repo = new SqliteVideoRepository();

    const ctx = new VideoUploadProviderContext(provider);
    const result = await ctx.process(body);

    const register = new VideoRegister(repo)

    // ATENÇÃO USUARIO id-test apenas para testes

    const id = await register.execute({
        userId: "id-test",
        provider: "youtube",
        title: result.title,
        description: result.description,
        extension: result.videoMetada.type
    })

    return c.json({
        videoId: id,
        userId: "id-test",
        provider: "youtube",
        title: result.title,
        description: result.description,
        extension: result.videoMetada.type,
        uploadUrl: result.uploadUrl
    }, 200);

  } catch (err) {
    console.error(err);
    return c.json({ error: String(err) }, 400);
  }
}
