import { VideoStatus, VideoProviders } from "./video.data.dto.ts";
import { AllowVideoTypes } from "./video.extensions.ts";

export class Video {
    public providerVideoId?: string
    public status?: VideoStatus
    public extension?: AllowVideoTypes
    public description?: string

    constructor(
        public id: string,
        public userId: string,
        public provider: VideoProviders,
        public title: string
    ) {}


}

