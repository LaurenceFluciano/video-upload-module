import { Video } from "./video.ts";

export interface VideoRepository {
    save(video: Video): Promise<void>
    listVideosByUserId(userId: string): Promise<Video[]>
    getVideoById(id: string): Promise<Video | undefined>
}