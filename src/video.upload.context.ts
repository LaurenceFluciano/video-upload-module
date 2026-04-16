import { VideoUploadProviderData, VideoUploadProviderRequest } from "./video.dto.ts"
import { isAllowedVideoType } from "./video.metadata.ts"
import { VideoUploadProvider } from "./video.upload.provider.ts"

export class VideoUploadProviderContext {
    constructor(private provider: VideoUploadProvider) {}

    private video!: VideoUploadProviderData

    async process(rawMetadata: VideoUploadProviderRequest) {
        this.validate(rawMetadata)
            .build()

        const uploadUrl = await this.provider.execute(this.video)

        this.logUpload()

        return uploadUrl
    }

    private build(video: VideoUploadProviderData) {
        this.video = {
            title: video.title,
            description: video.description,
            videoMetada: { 
                size: video.videoMetada.size,
                type: video.videoMetada.type
            }
        } 
    }

    private validate(video: VideoUploadProviderRequest): {
        build: () => void
    } {
        if (video.videoMetada.size > 500_000_000) {
            throw new Error("Arquivo muito grande")
        }

        if (isAllowedVideoType(video.videoMetada.type)) {
            throw new Error("Formato do arquivo inválido, a extensão deve uma dessas: .mp4, .mov, .webm")
        }

        return { build: () => this.build(video as VideoUploadProviderData) }
    }

    private logUpload() {
        console.warn("Upload iniciado:", this.video)
    }
}



