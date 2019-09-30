

import open from "open-browsers";
import request from "request";
import { logger } from "@tamland/logger";


const label = "server";


export const openTask = async function(path: string): Promise<void>{

    try{

        await new Promise((resolve): void => {

            const oneSecond = 1000;
            const retryLogMinimum = 4;

            let attemptsBeforeRamping = 10;
            let rampingFactor = 1;

            logger.log(`Opening ${ path } in your default browser`, { label });

            const test = (retry = 1): void => {

                request(path, (error): void => {

                    if(error){

                        attemptsBeforeRamping -= 1;

                        if(attemptsBeforeRamping <= 0){
                            rampingFactor = 2;
                        }

                        if(retry > retryLogMinimum){

                            logger.log(`Opening ${ path } in your default browser: retry in ${ retry } ${ retry === 1 ? "second" : "seconds" }`, { label });

                        }

                        setTimeout((): void => test(retry * rampingFactor), retry * oneSecond);

                    }else{

                        open(path);

                        resolve();

                    }

                });

            };

            test();

        });

    }catch(error){}

};
