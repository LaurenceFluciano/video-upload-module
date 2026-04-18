import { YoutubeVideoUploadProvider } from "../infra/providers/youtube.video.upload.provider.ts";
import { VideoProviders } from "../video.data.dto.ts";
import { VideoUploadProvider } from "../interfaces/video.upload.provider.ts";


export class VideoUploadProviderFactory {
    create(provider: VideoProviders): VideoUploadProvider {
            if (provider === "youtube") {
                return new YoutubeVideoUploadProvider();
            }

        throw new Error(`Provider para o ${provider} não implementado.`);
    }
}