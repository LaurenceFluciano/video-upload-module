import { AllowVideoTypes } from "./video.extensions.ts";

export type VideoMetadata = {
    size: number,
    type: AllowVideoTypes
}

export type VideoUploadProviderData  = {
    title: string,
    description: string,
    videoMetada: VideoMetadata,
}

export type VideoStatus = "pending" | "active"

export type VideoProviders = "youtube" | "supabase"