

import {
    createBrowserHistory,
    createMemoryHistory,
    History
} from "history";


export const createHistory = function(url: string = "/"): History{

    return typeof window === "undefined" ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();

};
