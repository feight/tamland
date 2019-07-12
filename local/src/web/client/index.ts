

import { Client } from "@tamland/web";

import { App } from "../app";

if(process.env.watch){

    if(typeof module.hot !== "undefined"){

        module.hot.accept();

    }

}

const client = new Client(App);

client.start();
