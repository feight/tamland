
import { Store } from "redux";
import { History } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";

import { createHistory } from "../history";
import { createStore } from "../store";
import { Tamland } from "../app";


export class Client{

    private Application: React.ComponentClass;

    private history: History;

    private store: Store;

    public constructor(Application: React.ComponentClass){

        const history = createHistory();
        const store = createStore(history);

        this.history = history;
        this.store = store;

        this.Application = Application;

    }

    public start(): void{

        const Application = this.Application;

        const app = (
            <Tamland
                history={ this.history }
                store={ this.store }
            >
                <Application />
            </Tamland>
        );

        loadableReady((): void => {

            ReactDOM.hydrate(app, document.querySelector("#app"));

        });

    }

}
