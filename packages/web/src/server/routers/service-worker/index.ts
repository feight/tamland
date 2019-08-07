

import express from "express";
import makeRequest from "request";


export const serviceWorkerRouter = (): express.Router => {

    // Force exact matches on paths
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    const defaultPort = 8080;

    router.get("/service-worker.js", (request, response): void => {

        const port = request.socket.localPort && request.socket.localPort !== defaultPort ? `:${ request.socket.localPort }` : "";

        makeRequest(`${ request.protocol }://${ request.hostname }${ port }/static/service-worker.js`).pipe(response);

    });

    return router;

};
