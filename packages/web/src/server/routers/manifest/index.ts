

import express from "express";

import { ManifestConfiguration } from "./types";


export const manifestRouter = (config: ManifestConfiguration): express.Router => {

    // Force exact matches on paths
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    router.get("/manifest.json", (request, response): void => {

        response.setHeader("Content-Type", "application/json");

        response
        .send(JSON.stringify({
            // We don't get to pick the property names of the manifest.json spec
            /* eslint-disable camelcase */
            background_color: config.backgroundColor,
            description: config.description,
            display: config.display,
            icons: config.icons,
            name: config.name,
            orientation: config.orientation,
            scope: config.scope,
            short_name: config.shortName,
            start_url: config.startUrl,
            theme_color: config.themeColor
            /* eslint-enable camelcase */
        }))
        .end();

    });

    return router;

};
