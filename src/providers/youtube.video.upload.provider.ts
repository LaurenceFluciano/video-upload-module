import { VideoUploadProviderData, VideoMetadata } from "../video.data.dto.ts";
import { VideoUploadProviderResponse } from "../dtos/video.response.dto.ts";
import { VideoUploadProvider } from "../interfaces/video.upload.provider.ts";


// Simulando import de configuração externo
const ACCESS_TOKEN = ""

export class YoutubeVideoUploadProvider implements VideoUploadProvider {
    
    async execute(request: VideoUploadProviderData): Promise<string> {
        try {
            const result = await this.requestUploadCode(request.videoMetada);

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
        accessToken: ACCESS_TOKEN,
    }


    async requestUploadCode(videoMetada: VideoMetadata): Promise<VideoUploadProviderResponse> {
        const response = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json; charset=UTF-8",
                    "X-Upload-Content-Length": videoMetada.size.toString(),
                    "X-Upload-Content-Type": "video/*"
                },
                body: JSON.stringify({
                    snippet: {
                        title: this.internalOptions.title,
                        description: this.internalOptions.description,
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
