import { VideoUploadProviderResponse } from "../../dtos/video.response.dto.ts";
import { VideoUploadProviderData, VideoMetadata } from "../../video.data.dto.ts";


import { YOUTUBE_ACCESS_TOKEN } from "../../../config.ts";
import { VideoUploadProvider } from "../../interfaces/video.upload.provider.ts";

export class YoutubeVideoUploadProvider implements VideoUploadProvider {
    
    async execute(request: VideoUploadProviderData): Promise<string> {
        try {
            const result = await this.requestUploadCode(request);

            return result.uploadCode;
        } catch( err ) {
            throw err        
        }
    }


    /* Low level code */


    private internalOptions: Record<string, any> = {
        tags: ["video"],
        status: {
            privacyStatus: "unlisted",
            embeddable: true,
            license: "youtube"
        },
        category: {
            "Education": 27,
            "Science & Technology": 28,
            "Music": 10
        },
        accessToken: YOUTUBE_ACCESS_TOKEN,
    }


    async requestUploadCode(request: VideoUploadProviderData): Promise<VideoUploadProviderResponse> {
        console.warn(request);

        const response = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${YOUTUBE_ACCESS_TOKEN}`,
                    "Content-Type": "application/json; charset=UTF-8",
                    "X-Upload-Content-Length": request.videoMetada.size.toString(),
                    "X-Upload-Content-Type": "video/" + request.videoMetada.type.slice(1)
                },
                body: JSON.stringify({
                    snippet: {
                        title: request.title,
                        description: request.description,
                        tags: this.internalOptions.tags,
                        categoryId: this.internalOptions.category["Education"]
                    },
                    status: this.internalOptions.status
                }),
            })

        if (!response.ok) {
            const errorData = await response.json();
            console.error("--- ERRO DO GOOGLE ---");
            console.error(JSON.stringify(errorData, null, 2));


            throw new Error("Ocorreu um erro ao gerar o código de upload.");
        }

        return {
            uploadCode: response.headers.get("location")
        } as VideoUploadProviderResponse
    }


}
