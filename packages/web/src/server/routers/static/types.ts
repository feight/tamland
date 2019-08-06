

import { Express } from "express";


export interface StaticFile {
    cacheExpiration?: string | number;
    path: string;
    source: string;
}

export interface StaticRouter {
    app: Express;
    cacheExpiration?: string | number;
    cwd?: string;
    local?: boolean;
    staticFiles?: StaticFile[];
    staticFolder: string;
}
