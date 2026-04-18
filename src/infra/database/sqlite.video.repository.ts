import { db } from "./db.ts";
import { Video } from "../../video.ts";
import { VideoRepository } from "../../video.repository.ts";

export class SqliteVideoRepository implements VideoRepository {

    async save(video: Video): Promise<void> {
        // Use INSERT OR REPLACE to upsert
        db.query(
            `INSERT OR REPLACE INTO videos (id, user_id, title, description, provider, provider_video_id, extension, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                video.id,
                video.userId,
                video.title,
                video.description ?? null,
                video.provider,
                video.providerVideoId ?? null,
                video.extension ?? null,
                video.status ?? "pending",
            ],
        );
    }

    async getVideoById(id: string): Promise<Video | undefined> {
        const rows = [...db.query("SELECT id, user_id, title, description, provider, provider_video_id, extension, status FROM videos WHERE id = ?", [id])];
        if (rows.length === 0) return undefined;

        const [row] = rows as any;
        const [rid, user_id, title, description, provider, provider_video_id, extension, status] = row;

        const video = new Video(rid, user_id, provider, title);
        video.description = description ?? undefined;
        video.providerVideoId = provider_video_id ?? undefined;
        video.extension = extension ?? undefined;
        video.status = status as any;

        return video;
    }

    async listVideosByUserId(userId: string): Promise<Video[]> {
        const result: Video[] = [];

        for (const row of db.query("SELECT id, user_id, title, description, provider, provider_video_id, extension, status FROM videos WHERE user_id = ?", [userId])) {
            const [rid, u, title, description, provider, provider_video_id, extension, status] = row as any;

            const video = new Video(rid, u, provider, title);
            video.description = description ?? undefined;
            video.providerVideoId = provider_video_id ?? undefined;
            video.extension = extension ?? undefined;
            video.status = status as any;

            result.push(video);
        }

        return result;
    }
}
