

declare module "workbox-precaching" {

    export function precacheAndRoute(routes: (string|{
        url: string;
        revision: string;
    })[]): void

}
