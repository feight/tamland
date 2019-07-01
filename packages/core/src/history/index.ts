

import {
    createBrowserHistory as createBrowserHistoryAlias,
    createMemoryHistory,
    History
} from "history";

import { isServer } from "../context";


export const createBrowserHistory = function(url = "/"): History{

    return isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistoryAlias();

};
