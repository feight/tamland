

declare module "workbox-routing" {

    import {
        CacheFirst,
        NetworkFirst,
        StaleWhileRevalidate
    } from "workbox-strategies";

    export function registerRoute(
        route: string|RegExp,
        strategy: CacheFirst|NetworkFirst|StaleWhileRevalidate
    ): void

}
