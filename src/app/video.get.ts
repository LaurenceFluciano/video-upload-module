import { VideoQueryResponse } from "../dtos/video.response.dto.ts";
import { VideoRepository } from "../video.repository.ts";

// To-do: Adicionar paginação (no atual momento é desnecessário)

export class VideoQuery {
    constructor(
        private repository: VideoRepository
    ) {}

    async getUserVideos(userId: string): Promise<VideoQueryResponse[]> {
        const videos = await this.repository.listVideosByUserId(userId);

        return videos.map((video) => {
            return {
                id: video.id,
                videoProviderId: video.providerVideoId,
                title: video.title,
                description: video.description,
                extension: video.extension,
                status: video.status
            }
        })
    }
}