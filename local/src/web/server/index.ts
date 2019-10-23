

import { Server } from "@tamland/web/lib/server";

import { App } from "../app";
import config from "../config";


const server = new Server({
    App,
    config,
    hostname: process.env.hostname,
    jwt: {
        secret: "ndB2N7l2sqSpvRNJBXtNdmxKfvj6up1VN"
    }
});

server.start();
