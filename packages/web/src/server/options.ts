

import path from "path";

import { IHelmetContentSecurityPolicyConfiguration } from "helmet";
import { BuildSchemaOptions } from "type-graphql";

import { JWTConfiguration } from "./middleware/jwt/types";
import {
    ManifestConfiguration,
    ManifestConfigurationIcon
} from "./routers/manifest";
import { StaticFile } from "./routers/static";

import { Application } from "../components/application";
import {
    TamlandAppConfig,
    TamlandAppConfigInterface
} from "../app/config";


interface GraphqlServerConfiguration{
    resolvers: BuildSchemaOptions["resolvers"];
}


export type ClientHint =
    "Viewport-Width" |
    "DPR" |
    "Device-Memory" |
    "RTT" |
    "Downlink" |
    "ECT";


export interface TamlandServerOptionsInterface{

    /**
     * Required.
     *
     * The React app component that will be rendered as the App
     *
     */
    App: typeof Application;

    /**
     * Optional.
     *
     * The length of time a static file served by this application should be cached
     * by web proxies and browsers. Sets the max-age property of the Cache-Control
     * header. The value is either milliseconds or a string of numbers and units,
     * separated by spaces, where units can be d for days, h for hours, m for minutes,
     * and s for seconds. For example, "4d 5h" sets cache expiration to 4 days and
     * 5 hours after the file is first requested.
     *
     * Default: "1y"
     */
    cacheExpiration?: string | number;


    /**
     * Optional.
     *
     * A list of client hints to request from the client.
     *
     * Client hints are a set of opt-in HTTP request headers that give us insight
     * into these aspects of the user’s device and the network they’re connected to.
     *
     * Default: ["Device-Memory", "Downlink", "DPR", "ECT", "RTT", "Viewport-Width"]
     *
     */
    clientHints?: ClientHint[];

    /**
     * Required.
     *
     * The React app configuration
     *
     */
    config: TamlandAppConfigInterface;

    /**
     * Optional.
     *
     * Helmet content security policy.
     *
     * Content Security Policy helps prevent unwanted content being injected into
     * your webpages; this can mitigate cross-site scripting (XSS) vulnerabilities,
     * malicious frames, unwanted trackers, and more.
     *
     * https://github.com/helmetjs/csp
     */
    csp?: IHelmetContentSecurityPolicyConfiguration;

    /**
     * Optional.
     *
     * Graphql server configuration
     */
    graphql?: GraphqlServerConfiguration;

    /**
     * Required.
     *
     * This should be set to process.env.hostname which is derived from your
     * tamlandrc.config.js environment hostname property.
     *
     * e.g. www.yourdomain.com
     */
    hostname?: string;

    /**
     * Optional.
     *
     * JWT configuration.
     *
     * e.g. {
     *   cookieName: "jwt-cookie",
     *   secret: "super-secret-jwt-secret"
     * }
     */
    jwt?: JWTConfiguration;

    /**
     * Optional.
     *
     * An object containing the data used to generate a web app manifest JSON file
     * that tells the browser about your web application and how it should behave
     * when 'installed' on the user's mobile device or desktop. Having a manifest
     * is required by Chrome to show the Add to Home Screen prompt.
     *
     * A typical manifest configuration includes information about the app name,
     * icons it should use, the start_url it should start at when launched, and more.
     *
     * https://developers.google.com/web/fundamentals/web-app-manifest/
     */
    manifest?: ManifestConfiguration;

    staticFiles?: StaticFile[];

    staticFolder?: string;

    /**
     * Optional.
     *
     * Sets the X-Powered-By http response header
     */
    xPoweredBy?: string;

}

export class TamlandServerOptions{

    App: typeof Application;

    cacheExpiration: string | number;

    clientHints?: (
        "Device-Memory" |
        "Downlink" |
        "DPR" |
        "ECT" |
        "RTT" |
        "Viewport-Width"
    )[];

    config: TamlandAppConfig;

    csp?: IHelmetContentSecurityPolicyConfiguration;

    graphql?: GraphqlServerConfiguration;

    hostname?: string;

    jwt: JWTConfiguration;

    manifest: ManifestConfiguration;

    staticFiles: StaticFile[];

    staticFolder: string;

    xPoweredBy: string;

    constructor(options: TamlandServerOptionsInterface){

        this.App = options.App;
        this.cacheExpiration = options.cacheExpiration ?? "1y";
        this.clientHints = options.clientHints ?? [
            "Device-Memory",
            "Downlink",
            "DPR",
            "ECT",
            "RTT",
            "Viewport-Width"
        ];
        this.config = new TamlandAppConfig(options.config);
        this.csp = options.csp;
        this.graphql = options.graphql;
        this.hostname = options.hostname;
        this.jwt = options.jwt ?? {};
        this.manifest = {
            backgroundColor: this.config.backgroundColor,
            description: this.config.description,
            display: "standalone",
            icons: this.config.icons.map((icon): ManifestConfigurationIcon => ({
                sizes: icon.size.join("x"),
                src: icon.path,
                type: `image/${ path.extname(icon.path).replace(/\./gu, "") || "png" }`
            })),
            name: this.config.name,
            shortName: this.config.shortName,
            startUrl: "/",
            themeColor: this.config.themeColor,
            ...options.manifest ?? {}
        };
        this.staticFiles = options.staticFiles ?? [];
        this.staticFolder = options.staticFolder ?? "static";
        this.xPoweredBy = options.xPoweredBy ?? "https://www.youtube.com/watch?v=e_DqV1xdf-Y";

    }

}
