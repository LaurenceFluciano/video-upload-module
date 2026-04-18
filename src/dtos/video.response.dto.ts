export type VideoUploadProviderResponse = {
    uploadCode: string
}


// VideoQuery

export type VideoQueryResponse = {
    id: string,
    title: string,
    videoProviderId?: string,
    description?: string,
    status?: string,
    extension?: string
}