import { VideoUploadProviderData } from "../video.data.dto.ts";

export interface VideoUploadProvider {
    execute(request: VideoUploadProviderData): Promise<string>
}
