import { VideoProviders } from "../video.data.dto.ts";
import { AllowVideoTypes } from "../video.extensions.ts";

export type VideoUploadProviderRequest = {
    title: string,
    description: string,
    videoMetada: {
        size: number,
        type: string
    }
}

export type VideoRegisterRequest = {
    id: string,
    userId: string,
    provider: VideoProviders,
    title: string
    description: string
    extension?: AllowVideoTypes
}


