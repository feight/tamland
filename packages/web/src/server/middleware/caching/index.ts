

import { Express } from "express";

import { CachingConfiguration } from "./types";


export const caching = function(
    app: Express,
    config: CachingConfiguration
): void{

    const {
        local = false
    } = config;

    // Disable etag on the local development server to prevent caching while testing
    if(local){
        app.disable("etag");
    }

};
