

import {
    CacheFirst,
    NetworkFirst,
    StaleWhileRevalidate
} from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { Plugin as ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
import { initialize as initializeGoogleAnalytics } from "workbox-google-analytics";

import { TamlandServiceWorkerOptionsInterface } from "./options";


export class ServiceWorker{

    public precache: (string|{
        url: string;
        revision: string;
    })[];

    public constructor(options: TamlandServiceWorkerOptionsInterface){

        const {
            precache = []
        } = options;

        this.precache = precache;

    }

    public start(): void{

        precacheAndRoute(this.precache);

        /*
         * Images carry most of the weight for a web page. Use this rule to serve
         * them quickly from the cache, while making sure you don’t cache them
         * indefinitely, consuming your users' storage.
         */
        registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/gu,
            new CacheFirst({
                cacheName: "images",
                plugins: [
                    new ExpirationPlugin({
                        // 30 Days
                        // eslint-disable-next-line no-magic-numbers
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                        maxEntries: 60
                    })
                ]
            })
        );

        /*
         * Make your JS and CSS ⚡ fast by returning the assets from the cache,
         * while making sure they are updated in the background for the next use.
         */
        registerRoute(
            /\.(?:js|css)$/gu,
            new StaleWhileRevalidate(),
        );

        registerRoute(
            /\.*\/$/gu,
            new NetworkFirst()
        );

        initializeGoogleAnalytics();

    }

}
