const ALLOWED_EXTENSIONS = [".mp4", ".mov", ".webm"] as const;

export type AllowVideoTypes = typeof ALLOWED_EXTENSIONS[number];

export function isAllowedVideoType(type: string): type is AllowVideoTypes {
    return ALLOWED_EXTENSIONS.includes(type as AllowVideoTypes);
}

