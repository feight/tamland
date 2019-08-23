
/*
    eslint
    no-sync: "off",
    security/detect-non-literal-fs-filename: "off",
*/

import fs from "fs";
import path from "path";

import express from "express";
import proxy from "express-http-proxy";

import { webp } from "./webp";


export interface StaticFile {
    cacheExpiration?: string | number;
    etag?: boolean;
    path: string;
    source: string;
}

export interface StaticRouter {
    app: express.Express;
    cacheExpiration?: string | number;
    cwd?: string;
    local?: boolean;
    staticFiles?: StaticFile[];
    staticFolder: string;
}


const getStaticFileMap = function(
    staticFiles: StaticFile[],
    staticFolder: string,
    cwd: string,
    watch: boolean,
    cacheExpiration: string | number
): StaticFile[]{

    // Static public url base and source
    const source = "dist/client";
    const webpackAssets = JSON.parse(fs.readFileSync(path.join(process.cwd(), "dist/client/webpack-assets.json")).toString());
    const getWebpackAsset = (chunkName: string): string => webpackAssets[chunkName].js.replace(`/${ staticFolder }`, source);

    const customStaticFiles: StaticFile[] = staticFiles.map((file): StaticFile => ({
        cacheExpiration,
        path: file.path,
        source: file.source.replace(`/${ staticFolder }`, source)
    }));

    const defaultStaticFiles: StaticFile[] = [
        {
            cacheExpiration: 0,
            etag: false,
            path: "/service-worker.js",
            source: getWebpackAsset("service-worker")
        },
        {
            cacheExpiration: 0,
            etag: false,
            path: "/service-worker.js.map",
            source: `${ getWebpackAsset("service-worker") }.map`
        },
        {
            cacheExpiration: "1h",
            path: "/robots.txt",
            source: "robots.txt"
        },
        {
            cacheExpiration: "1h",
            path: "/favicon.ico",
            source: "favicon.ico"
        },
        {
            cacheExpiration: "1h",
            path: "/favicon.png",
            source: "favicon.png"
        }

    /**
     * Get rid of any default static file routes that are overridden by custom static
     * file routes. This is useful if you want to route to your own version in a
     * custom location in your project.
     */
    ].filter((file): boolean => {

        const duplicates = customStaticFiles.filter((custom): boolean => custom.path === file.path);

        return duplicates.length === 0;

    }).map((file): StaticFile => {

        /**
         * If there is no default static file in the implementing project, check if
         * there is a static file default that can be used and use that instead.
         */
        if(!fs.existsSync(path.join(cwd, file.source))){

            const packagedAlternative = path.join(__dirname, "../../../static", file.source);

            if(fs.existsSync(packagedAlternative)){

                return {
                    ...file,
                    source: path.relative(cwd, packagedAlternative)
                };

            }

        }

        return {
            ...file,
            etag: typeof file.etag === "undefined" ? true : file.etag
        };

    });


    return defaultStaticFiles
    .concat(customStaticFiles);

};

export const staticRouter = ({
    cacheExpiration = "1h",
    cwd = process.cwd(),
    local = false,
    staticFiles = [],
    staticFolder
}: StaticRouter): express.Router => {

    const watch = Boolean(local && process.env.watch === "true");
    const encodedStaticFolder = staticFolder.split("/").map((sub): string => encodeURIComponent(sub)).join("/");

    // Force exact matches on paths
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    getStaticFileMap(staticFiles, staticFolder, cwd, watch, cacheExpiration).forEach((file): void => {

        router.use(file.path, express.static(path.join(cwd, file.source), {
            etag: file.etag,
            maxAge: file.cacheExpiration
        }));

    });

    if(watch){

        router.use(`/${ encodedStaticFolder }`, proxy("localhost:9000", {
            timeout: 2000
        }));

    }else{

        router.use(`/${ encodedStaticFolder }`, webp(path.join(cwd, "dist/client")));

        /*
         * This doesn't work in proudction at the moment. Appengine strips the accepts-encoding
         * header, which is required by this middleware.
         *
         *  router.use(`/${ encodedStaticFolder }`, expressStaticGzip(path.join(cwd, "dist/client"), {
         *      enableBrotli: true,
         *      orderPreference: ["br"],
         *      serveStatic: {
         *          etag: true,
         *          maxAge: "1y"
         *      }
         *  }));
         *
         */

        router.use(`/${ encodedStaticFolder }`, express.static(path.join(cwd, "dist/client"), {
            etag: true,
            immutable: true,
            maxAge: "1y"
        }));

        router.use(`/${ encodedStaticFolder }/*`, (
            request: express.Request,
            response: express.Response
        ): void => {

            const notFoundStatusCode = 404;

            response
            .status(notFoundStatusCode)
            .send("404")
            .end();

        });

    }

    return router;

};
