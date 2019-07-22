

export interface StaticFile {
    cacheExpiration?: string | number;
    path: string;
    source: string;
}

export interface StaticRouter {
    cacheExpiration?: string | number;
    cwd?: string;
    local?: boolean;
    staticFiles?: StaticFile[];
    staticFolder: string;
}
