

import { Server } from "@tamland/web/lib/server";

import { App } from "../app";
import config from "../config";
import { resolvers } from "../graphql";


const server = new Server({
    App,
    config,
    graphql: {
        resolvers
    },
    hostname: process.env.hostname,
    jwt: {
        secret: "ndB2N7l2sqSpvRNJBXtNdmKfvj6up1VN"
    }
});

server.start();
