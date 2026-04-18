import { VideoUploadValidatorFactory } from "../../factories/video.upload.validator.factory.ts";
import { SqliteVideoRepository } from "../database/sqlite.video.repository.ts";
import { VideoConfirm } from "../../app/video.confirm.ts";

export async function confirmHandler(c: any) {
  try {
    const data = await c.req.json();

    const repo = new SqliteVideoRepository();
    const validator = VideoUploadValidatorFactory.create("youtube");

    const useCase = new VideoConfirm(repo, validator);
    await useCase.execute(data);

    return c.json({ success: true }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: String(err) }, 400);
  }
}
