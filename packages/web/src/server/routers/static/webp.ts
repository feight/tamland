

import { URL } from "url";
import { join as pathJoin } from "path";
import fs from "fs";

import express from "express";
import vary from "vary";


export default function webp(
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

        if(method !== "GET" && method !== "HEAD"){

            return next();

        }

        const pathname = new URL(request.url).pathname;
        const extpos = pathname.lastIndexOf(".");
        const extension = pathname.substr(extpos + 1);

        if(
            extensions.includes(extension) &&
            request.headers.accept &&
            request.headers.accept.includes("image/webp")
        ){

            const newPathname = `${ pathname.substr(0, extpos) }.webp`;
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

        // Needed for a consistent return
        // eslint-disable-next-line no-undefined
        return undefined;

    };

}
