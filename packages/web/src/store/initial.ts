

import logger from "../logger";


let initialStateCache: object | undefined;

export const getInitialState = function(): object{

    if(initialStateCache){

        return initialStateCache;

    }

    const id = "redux-data";

    // Do we have preloaded state available? Great, save it.

    let initialState = {};

    if(typeof window !== "undefined"){

        const element = document.querySelector(`#${ id }`);

        if(element){

            try{

                initialState = JSON.parse(element.innerHTML);

            }catch(error){

                logger.error(`Could not parse initial data from element #${ id }`);

            }

        }else{

            logger.error(`Could not find initial data element #${ id }`);

        }

    }

    initialStateCache = initialState;

    return initialState;

};
