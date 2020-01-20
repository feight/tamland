

import {
    combineReducers,
    Reducer
} from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";


// Temporary blank reducer so that typescript doesn't freak out at one reducer
const blank = (state = 0): number => state;


export const createRootReducer = (history: History): Reducer => combineReducers({
    blank,
    router: connectRouter(history)
});

