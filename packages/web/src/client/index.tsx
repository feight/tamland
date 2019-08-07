
import { Store } from "redux";
import { History } from "history";
import ReactDOM from "react-dom";
import React from "react";
import { loadableReady } from "@loadable/component";

import {
    TamlandClientOptions,
    TamlandClientOptionsInterface
} from "./options";
import { registerServiceWorker } from "./register-service-worker";

import { createHistory } from "../history";
import { createStore } from "../store";
import { Tamland } from "../app";


export class Client{

    private history: History;

    private options: TamlandClientOptions;

    private store: Store;

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
                config={ this.options.config }
                history={ this.history }
                store={ this.store }
            >
                <App />
            </Tamland>
        );

        loadableReady((): void => {

            ReactDOM.hydrate(app, document.querySelector("#app"));

        });

        registerServiceWorker();

    }

}
