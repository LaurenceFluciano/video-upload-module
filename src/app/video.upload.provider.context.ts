
import { VideoUploadProviderData } from "../video.data.dto.ts";
import { VideoUploadProviderRequest } from "../dtos/video.request.dto.ts";
import { AllowVideoTypes, isAllowedVideoType } from "../video.extensions.ts";
import { VideoUploadProvider } from "../interfaces/video.upload.provider.ts";

export class VideoUploadProviderContext {
    constructor(private provider: VideoUploadProvider) {}

    private video!: VideoUploadProviderData

    async process(rawMetadata: VideoUploadProviderRequest): Promise<VideoUploadProviderData & {uploadUrl: string}> {
        this.validate(rawMetadata)
        this.build(rawMetadata)

        const uploadUrl = await this.provider.execute(this.video)

        this.logUpload()

        return {
            ...this.video,
            uploadUrl
        }
    }

    private build(video: VideoUploadProviderRequest) {
        this.video = {
            title: video.title,
            description: video.description,
            videoMetada: { 
                size: video.videoMetada.size,
                type: video.videoMetada.type as AllowVideoTypes
            }
        } 
    }

    private validate(video: VideoUploadProviderRequest)
    {
        if (video.videoMetada.size > 500_000_000) {
            throw new Error("Arquivo muito grande")
        }

        if (!isAllowedVideoType(video.videoMetada.type)) {
            throw new Error("Formato do arquivo inválido, a extensão deve uma dessas: .mp4, .mov, .webm")
        }

    }

    private logUpload() {
        console.warn("Upload iniciado:", this.video)
    }
}



