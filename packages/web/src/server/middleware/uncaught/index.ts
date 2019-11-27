

import logger from "../../../logger";


export const uncaught = function(): void{

    /*
     * Listen for unhandled promise rejections and log the errors. If this isn't
     * done, it's pretty impossible to track these errors down.
     */
    process.on("unhandledRejection", (reason, promise): void => {

        logger.error(`unhandled promise rejection at: ${ String(promise) }\nreason:\n${ String(reason) }\n`);

    });

    /*
     * Listen for unhandled promise rejections and log the errors. If this isn't
     * done, it's pretty impossible to track these errors down.
     */
    process.on("uncaughtException", (exception): void => {

        logger.error(`uncaught exception: ${ String(exception) }\n`);

    });

};
