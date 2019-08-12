

import logger from "../logger";


export const registerServiceWorker = async function(): Promise<void>{

    /*
     *  If everything goes tits up uncomment this code
     *
     *  navigator.serviceWorker.getRegistrations().then((registrations) => {
     *      for(let registration of registrations){
     *          registration.unregister()
     *      }
     *  })
     *
     *  return false;
     */

    if(
        "serviceWorker" in navigator &&
        !window.location.host.includes("localhost") &&
        window.location.protocol.includes("https")
    ){

        const sw = navigator.serviceWorker;
        const path = "/service-worker.js";

        try{

            const reg = await sw.register(path);

            reg.onupdatefound = (): void => {

                const installingWorker = reg.installing;

                if(installingWorker){

                    installingWorker.onstatechange = (): void => {

                        if(installingWorker.state === "installed"){

                            if(sw.controller){

                                logger.log("New or updated content is available.");

                            }else{

                                logger.log("Content is now available offline!");

                            }

                        }else if(installingWorker.state === "redundant"){

                            logger.error("The installing service worker became redundant.");

                        }

                    };

                }

            };

        }catch(error){

            logger.error("Error during service worker registration:", error);

        }

    }

};
