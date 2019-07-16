

import { Client } from "@tamland/web";

import { App } from "../app";


if(process.env.watch){

    if(typeof module.hot !== "undefined"){

        module.hot.accept();

    }

}


export const start = function(): void{

    const client = new Client(App);

    client.start();

};
