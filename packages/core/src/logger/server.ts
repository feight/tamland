

import { LoggingWinston } from "@google-cloud/logging-winston";
import {
    createLogger, transports, format
} from "winston";


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
    transports: loggingWinston ? [
        new transports.Console(),
        loggingWinston
    ] : [
        new transports.Console()
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
