

import path from "path";

import * as React from "react";
import express from "express";
import compression from "compression";
import { renderToString } from "react-dom/server";
import { HelmetData } from "react-helmet";
import { ChunkExtractor } from "@loadable/server";
import { getDataFromTree } from "@apollo/react-ssr";

import { renderIcons } from "./icons";

import { TamlandAppConfig } from "../../../app/config";
import {
    createStore,
    reduxStateSerializationId
} from "../../../store";
import { Tamland } from "../../../app";
import { createHistory } from "../../../history";
import { Application } from "../../../components/application";
import {
    apolloStateSerializationId,
    createApolloClient
} from "../../../graphql";


const minifyHTML = function(html: string): string{

    return html
    .replace(/^\s*/gmu, "")
    .replace(/(?:\r\n|\r|\n)/gu, " ")
    .replace(/>\s*</gu, "><")
    .replace(/\s*></gu, "><")
    // You can't escape that character, it causes a parsing error
    // eslint-disable-next-line no-div-regex
    .replace(/="(.[^\s]*?)"\/>/gu, "=$1 />")
    // You can't escape that character, it causes a parsing error
    // eslint-disable-next-line no-div-regex
    .replace(/="(.[^\s]*?)"/gu, "=$1");

};


const createChunkExtractor = function(entrypoints: string[]): ChunkExtractor{

    const statsFile = path.join(process.cwd(), "dist/client/loadable-stats.json");

    return new ChunkExtractor({
        entrypoints,
        statsFile
    });

};

const getLinkHeader = function(extractor: ChunkExtractor): string{

    return extractor.getLinkElements().map((element): string => {

        const link = element.props as {
            as: string;
            href: string;
            rel: string;
        };

        return `<${ link.href }>;rel=${ link.rel };as=${ link.as }`;

    }).join(",");

};


const helmetContext: {
    helmet?: HelmetData;
} = {};


export interface AppRouterConfiguration{
    App: typeof Application;
    config: TamlandAppConfig;
    local: boolean;
}

export const applicationRouter = (routerConfig: AppRouterConfiguration): express.Router => {

    const {
        App,
        config
    } = routerConfig;

    // Force exact matches on paths
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    router.use(compression());

    const iconMetadata = renderIcons(config.icons);

    router.get("*/", async (request, response): Promise<void> => {

        const history = createHistory(request.url);
        const store = createStore(history);
        const chunkExtractor = createChunkExtractor([
            "index"
        ]);
        const reduxState = store.getState();
        const apolloClient = createApolloClient(request);

        const app = (
            <Tamland
                apolloClient={ apolloClient }
                config={ config }
                helmetContext={ helmetContext }
                history={ history }
                request={ request }
                store={ store }
            >
                <App
                    router={ config.router }
                />
            </Tamland>
        );

        await getDataFromTree(app);

        const content = renderToString(chunkExtractor.collectChunks(app));

        const { helmet } = helmetContext;

        // Set the http2 link header with assets that need to be pushed
        response.setHeader("link", getLinkHeader(chunkExtractor));

        if(helmet){

            response.send(minifyHTML(`
                <!doctype html>
                    <html ${ helmet.htmlAttributes.toString() }>
                    <head>
                        <meta charset="utf-8">
                        <meta name="generator" content="Idle Hands">
                        ${ helmet.title.toString() }
                        ${ helmet.meta.toString() }
                        ${ helmet.link.toString() }
                        <base href="/">
                        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=0,viewport-fit=cover">
                        <link rel="manifest" href="/manifest.json">
                        <meta name="msapplication-config" content="/browserconfig.xml">
                        <meta name="msapplication-TileColor" content="${ config.tileColor }">
                        <meta name="theme-color" content="${ config.themeColor }">
                        ${ iconMetadata }
                        ${ chunkExtractor.getLinkTags() }
                        ${ chunkExtractor.getStyleTags() }
                    </head>
                    <body ${ helmet.bodyAttributes.toString() }>
                        <div id="app">${ content }</div>
                        <script id="${ reduxStateSerializationId }" type="application/json">
                            ${ JSON.stringify(reduxState) }
                        </script>
                        <script id="${ apolloStateSerializationId }" type="application/json">
                            ${ JSON.stringify(apolloClient.extract()) }
                        </script>
                        ${ chunkExtractor.getScriptTags() }
                    </body>
                </html>
            `));

        }else{

            throw new Error("Could not initialize helmet data");

        }

        response.end();

    });

    return router;

};
