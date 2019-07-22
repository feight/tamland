

import { Server } from "@tamland/web";

import { App } from "../app";
import { routes } from "../routes";


const server = new Server(App, {
    hostname: "www.sweetlikepete.com",
    jwt: {
        secret: "ndB2N7l2sqSpvRNJBXtNdmKfvj6up1VN"
    },
    routes
});

server.start();
