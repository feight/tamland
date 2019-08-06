

import firestore from "./firestore";
import memcached from "./memcached";
import server from "./server";

import open from "../open";
import tamland from "../tamland";
import build from "../build";


const local = async function(config, options){

    await tamland(config, options);

    await Promise.all([
        firestore(config, options),
        memcached(config, options),
        open(`http://localhost:${ config.nodemon.port }`),
        server(config, options),
        build(config, options)
    ]);

};


export default local;
