

import { URL } from "url";
import { join as pathJoin } from "path";
import fs from "fs";

import express from "express";
import vary from "vary";


export const webp = function(
    dirname: string,
    extensions: string[] = [
        "jpeg",
        "jpg",
        "png"
    ]
): (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => void{

    return function middleware(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void{

        const method = request.method.toUpperCase();

        if(
            method !== "GET" &&
            method !== "HEAD"
        ){

            return next();

        }

        const pathname = new URL(request.url, `${ request.protocol }://${ request.get("host") }`).pathname;
        const extpos = pathname.lastIndexOf(".");
        const extension = pathname.slice(extpos + 1);

        if(
            extensions.includes(extension) &&
            request.headers.accept &&
            request.headers.accept.includes("image/webp")
        ){

            const newPathname = `${ pathname }.webp`;
            const filePath = pathJoin(dirname, newPathname);

            // Not a security concern, and we can't use node/prefer-promises/fs until node 11.4.0
            // eslint-disable-next-line security/detect-non-literal-fs-filename, node/prefer-promises/fs
            fs.stat(filePath, (error, stats): void => {

                if(error){

                    return next();

                }else if(stats.isFile()){

                    request.url = request.url.replace(pathname, newPathname);

                    vary(response, "Accept");

                    return next();

                }

                return next();

            });

        }else{

            return next();

        }

        return undefined;

    };

};
