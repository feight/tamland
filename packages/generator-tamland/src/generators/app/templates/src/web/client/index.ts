

import { Client } from "@tamland/web/lib/client";

import { App } from "../app";
import config from "../config";


if(process.env.watch){

    if(typeof module.hot !== "undefined"){

        module.hot.accept();

    }

}


const client = new Client({
    App,
    config
});

client.start();
