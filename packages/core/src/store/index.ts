

import {
    applyMiddleware,
    compose,
    createStore as createReduxStore,
    Store
} from "redux";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import thunk from "redux-thunk";

import { createRootReducer } from "./reducers";
import { getInitialState } from "./initial";


export const createStore = function(history: History): Store{

    const initialState = getInitialState();

    return createReduxStore(
        createRootReducer(history),
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history)),
            applyMiddleware(thunk)
        )
    );

};
