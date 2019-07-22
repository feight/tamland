

import { Server } from "@tamland/web/lib/server";

import { App } from "../app";
import config from "../config";
import { routes } from "../routes";


const server = new Server({
    App,
    config,
    hostname: "www.newsteam.io",
    jwt: {
        secret: "ndB2N7l2sqSpvRNJBXtNdmKfvj6up1VN"
    },
    routes
});

server.start();
