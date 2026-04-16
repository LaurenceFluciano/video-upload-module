import { VideoMetadata } from "./video.metadata.ts"

export type VideoUploadProviderData  = {
    title: string,
    description: string,
    videoMetada: VideoMetadata
}



export type VideoUploadProviderResponse = {
    err: Error | null,
    uploadCode: string | null
}

export type VideoUploadProviderRequest = {
    title: string,
    description: string,
    videoMetada: VideoMetadataRequest
}

export type VideoMetadataRequest = {
    size: number,
    type: string
}
