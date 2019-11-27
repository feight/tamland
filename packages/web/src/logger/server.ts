

import { LoggingWinston } from "@google-cloud/logging-winston";
import {
    createLogger,
    format,
    transports
} from "winston";
import Transport from "winston-transport";


class LocalTransport extends Transport{

    // Extending this function so I can't change the type of info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-untyped-public-signature
    log(info: any, next: () => void): void{

        setImmediate((): void => {

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


export default logger;
