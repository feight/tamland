

import logger from "../logger";


let initialStateCache: object | undefined;


export const getInitialState = function(serializationId: string): object{

    if(initialStateCache){

        return initialStateCache;

    }

    // Do we have preloaded state available? Great, save it.

    let initialState = {};

    if(typeof window !== "undefined"){

        const element = document.querySelector(`#${ serializationId }`);

        if(element){

            try{

                initialState = JSON.parse(element.innerHTML);

            }catch(error){

                logger.error(`Could not parse initial data from element #${ serializationId }`);

            }

        }else{

            logger.error(`Could not find initial data element #${ serializationId }`);

        }

    }

    initialStateCache = initialState;

    return initialState;

};
