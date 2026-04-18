

export interface VideoUploadValidator {
    verify(videoCode: string): Promise<boolean>
}