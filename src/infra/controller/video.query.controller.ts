import { SqliteVideoRepository } from "../database/sqlite.video.repository.ts";
import { VideoQuery } from "../../app/video.get.ts";

export async function getUserVideosHandler(c: any) {
  try {
    // Hono path param
    const userId = c.req.param ? c.req.param('userId') : undefined;
    const id = userId || (c.req.raw && c.req.raw.params && c.req.raw.params.userId) || undefined;

    if (!id) {
      return c.json({ error: "userId is required" }, 400);
    }

    const repo = new SqliteVideoRepository();
    const useCase = new VideoQuery(repo);

    const videos = await useCase.getUserVideos(id);

    return c.json(videos, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: String(err) }, 500);
  }
}
