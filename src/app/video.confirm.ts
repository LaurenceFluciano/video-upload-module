import { VideoUploadValidator } from "../interfaces/video.upload.validator.ts";
import { VideoRepository } from "../video.repository.ts";

export type VideoConfirmData = {
    videoId: string,
    videoCode: string,
}

export class VideoConfirm {
    constructor(
        private repository: VideoRepository,
        private provider: VideoUploadValidator
    ) {}

    async execute(data: VideoConfirmData): Promise<void> {
        const video = this.repository.getVideoById(data.videoId);
        if (!video) {
            throw new Error("Vídeo não encontrado no sistema.");
        }

        const isValid = await this.provider.verify(data.videoCode);
        
        if (!isValid) {
            throw new Error("O vídeo não pertence a esta conta ou é inválido no provedor.");
        }

        video.status = "active";
        video.providerVideoId = data.videoCode;

        this.repository.save(video);
    }
}