

import { LoggingWinston } from "@google-cloud/logging-winston";
import {
    createLogger,
    format,
    transports
} from "winston";
import Transport from "winston-transport";


class LocalTransport extends Transport{

    // Extending this function so I can't change the type of info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(info: any, next: () => void): void{

        setImmediate((): void => {

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log(info.message);

            this.emit("logged", info);

        });

        next();

    }

}


const service = process.env.GAE_SERVICE;
const version = process.env.GAE_VERSION;
const local = process.env.local === "true" || false;

const loggingWinston = service && version ? new LoggingWinston({
    serviceContext: {
        service,
        version
    }
}) : null;


const localLoggerConfig = {
    format: format.simple(),
    level: "info",
    transports: [
        new LocalTransport()
    ]
};

const loggerConfig = {
    level: "info",
    transports: loggingWinston ? [
        new transports.Console(),
        loggingWinston
    ] : [
        new transports.Console()
    ]
};

const logger = createLogger(local ? localLoggerConfig : loggerConfig);


export default {
    // This isn't a problem with console methods
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
    debug: (message?: any, ...optionalParameters: any[]): void => {
        logger.debug(message, ...optionalParameters);
    },
    error: (message?: any, ...optionalParameters: any[]): void => {
        logger.error(message, ...optionalParameters);
    },
    info: (message?: any, ...optionalParameters: any[]): void => {
        logger.info(message, ...optionalParameters);
    },
    log: (message?: any, ...optionalParameters: any[]): void => {
        logger.log("info", message, ...optionalParameters);
    },
    silly: (message?: any, ...optionalParameters: any[]): void => {
        logger.silly(message, ...optionalParameters);
    },
    verbose: (message?: any, ...optionalParameters: any[]): void => {
        logger.verbose(message, ...optionalParameters);
    },
    warn: (message?: any, ...optionalParameters: any[]): void => {
        logger.warn(message, ...optionalParameters);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
};
