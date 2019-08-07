

import fs from "fs";
import path from "path";

import express from "express";
import makeRequest from "request";


export const serviceWorkerRouter = (): express.Router => {

    // Force exact matches on paths
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    const assetsFile = path.join(process.cwd(), "dist/client/webpack-assets.json");
    // eslint-disable-next-line no-sync, security/detect-non-literal-fs-filename
    const assets = JSON.parse(fs.readFileSync(assetsFile).toString());
    const asset = assets["service-worker"];
    const defaultPort = 8080;

    router.get("/service-worker.js", (request, response): void => {

        if(asset && asset.js){

            const port = request.socket.localPort && request.socket.localPort !== defaultPort ? `:${ request.socket.localPort }` : "";

            makeRequest(`${ request.protocol }://${ request.hostname }${ port }${ asset.js }`).pipe(response);

        }else{

            const httpNotFound = 404;

            response.status(httpNotFound).send("");

        }

    });

    return router;

};
