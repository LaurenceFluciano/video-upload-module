import { Video } from "./video.ts";

export interface VideoRepository {
    save(video: Video): null
    listVideosByUserId(userId: string): Video[]
    getVideoById(id: string): Video
}