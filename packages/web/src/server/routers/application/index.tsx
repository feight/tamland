

import path from "path";

import * as React from "react";
import express from "express";
import compression from "compression";
import { renderToString } from "react-dom/server";
import { matchPath } from "react-router-dom";
import { HelmetData } from "react-helmet";
import { Store } from "redux";
import { ChunkExtractor } from "@loadable/server";

import { renderIcons } from "./icons";
import { AppRouterConfiguration } from "./types";

import { Route as PageRoute } from "../../../components/route";
import { createStore } from "../../../store";
import { Tamland } from "../../../app";
import { createHistory } from "../../../history";


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

const getRouteData = async function(routes: PageRoute[], store: Store, request: express.Request): Promise<void>{

    const actions: (() => Promise<object>) = (): Promise<object> => new Promise((resolve): void => {
        resolve({});
    });

    let match = null;

    routes.some((route: PageRoute): boolean => {

        // Use `matchPath` here
        match = matchPath(request.path, {
            exact: route.exact,
            path: route.path,
            strict: route.strict
        });

        return Boolean(match);

    });

    await actions();

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


export const applicationRouter = (routerConfig: AppRouterConfiguration): express.Router => {

    const {
        App,
        config,
        routes
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

        await getRouteData(routes, store, request);

        const reduxState = store.getState();

        const Application = (
            <Tamland
                config={ config }
                helmetContext={ helmetContext }
                history={ history }
                request={ request }
                store={ store }
            >
                <App />
            </Tamland>
        );

        const content = renderToString(chunkExtractor.collectChunks(Application));

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
                        <script id="redux-data" type="application/json">${ JSON.stringify(reduxState) }</script>
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
