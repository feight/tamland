

declare module "workbox-strategies" {

    import { Plugin as ExpirationPlugin } from "workbox-expiration";

    export class CacheFirst{

        constructor(options: {
            cacheName: string;
            plugins: (ExpirationPlugin)[];
        })

    }

    export class NetworkFirst{}

    export class StaleWhileRevalidate{}

}
