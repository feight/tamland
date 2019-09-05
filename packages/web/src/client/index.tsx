
import { Store } from "redux";
import { History } from "history";
import ReactDOM from "react-dom";
import React from "react";
import { loadableReady } from "@loadable/component";

import {
    TamlandClientOptions,
    TamlandClientOptionsInterface
} from "./options";
import { registerServiceWorker } from "./register";

import { createHistory } from "../history";
import { createStore } from "../store";
import { Tamland } from "../app";
import logger from "../logger";
import { createApolloClient } from "../graphql";


export class Client{

    private readonly history: History;

    private readonly options: TamlandClientOptions;

    private readonly store: Store;

    public constructor(options: TamlandClientOptionsInterface){

        const history = createHistory();
        const store = createStore(history);

        this.history = history;
        this.store = store;
        this.options = new TamlandClientOptions(options);

    }

    public start(): void{

        const App = this.options.App;

        const app = (
            <Tamland
                apolloClient={ createApolloClient() }
                config={ this.options.config }
                history={ this.history }
                store={ this.store }
            >
                <App
                    loader={ this.options.config.loader }
                    routes={ this.options.config.routes }
                />
            </Tamland>
        );

        loadableReady((): void => {

            ReactDOM.hydrate(app, document.querySelector("#app"));

        }).catch((error: Error): void => {

            logger.error("@loadable/component failed to ready up.");
            logger.error(error);

        });

        registerServiceWorker().catch((error: Error): void => {

            logger.error("Failed to register service worker.");
            logger.error(error);

        });

    }

}
