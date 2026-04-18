import { VideoUploadValidator } from "../../interfaces/video.upload.validator.ts";
import { YOUTUBE_ACCESS_TOKEN } from "../../../config.ts";

export class YoutubeVideoUploadValidator implements VideoUploadValidator {
    
    async verify(videoCode: string): Promise<boolean> {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=status,snippet&id=${videoCode}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${YOUTUBE_ACCESS_TOKEN}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                return false;
            }

            const uploadStatus = data.items[0].status.uploadStatus;
            
            return uploadStatus === "processed" || uploadStatus === "uploaded";

        } catch (error) {
            console.error("Erro ao validar vídeo no YouTube:", error);
            return false;
        }
    }

}
