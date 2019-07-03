

import {
    createBrowserHistory,
    createMemoryHistory,
    History
} from "history";

import { isServer } from "../context";


export const createHistory = function(url: string = "/"): History{

    return isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();

};
