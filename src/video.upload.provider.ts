import { VideoUploadProviderData } from "./video.dto.ts";


export interface VideoUploadProvider {
    execute(request: VideoUploadProviderData): Promise<string>
}
