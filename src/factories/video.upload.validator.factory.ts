import { VideoUploadValidator } from "../interfaces/video.upload.validator.ts";
import { YoutubeVideoUploadValidator } from "../providers/youtube.video.upload.validator.ts";

import { VideoProviders } from "../video.data.dto.ts";

export class VideoUploadValidatorFactory {
    static create(provider: VideoProviders): VideoUploadValidator {
        if (provider === "youtube") {
            return new YoutubeVideoUploadValidator();
        }

        throw new Error(`Validator para o provider ${provider} não implementado.`);
    }
}