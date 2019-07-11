

import { Link } from "react-router-dom";

import { Client } from "./client";
import { Helmet } from "./components/helmet";
import { Page } from "./components/page";
import { Route } from "./components/route";
import { Router } from "./components/router";
import { isServer } from "./context";


// Needed so that webpack won't require this on the client
// eslint-disable-next-line no-eval
const { Server } = isServer ? eval("require")("./server") : {
    Server: null
};

// Needed so that webpack won't require this on the client
// eslint-disable-next-line node/no-missing-require, @typescript-eslint/no-require-imports
const Modernizr = isServer ? {} : require("modernizr");


export {
    Client,
    Helmet,
    isServer,
    Link,
    Modernizr,
    Page,
    Route,
    Router,
    Server
};
