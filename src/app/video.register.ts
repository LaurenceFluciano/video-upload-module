import { VideoProviders } from "../video.data.dto.ts";
import { AllowVideoTypes } from "../video.extensions.ts";
import { VideoRepository } from "../video.repository.ts";
import { Video } from "../video.ts";


export type VideoRegisterData = {
    userId: string,
    provider: VideoProviders,
    title: string
    description: string
    extension?: AllowVideoTypes
}

export class VideoRegister {
    constructor(
        private repository: VideoRepository
    ) {}

    execute(data: VideoRegisterData): string {
        const video = new Video(
            crypto.randomUUID().toString(),
            data.userId,
            data.provider,
            data.title
        )

        video.description = data.description;
        video.extension = data.extension;
        video.status = "pending";

        this.repository.save(video)

        return video.id;
    }
}