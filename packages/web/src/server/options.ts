

import path from "path";

import { IHelmetContentSecurityPolicyConfiguration } from "helmet";
import { ComponentClass } from "react";

import { GraphqlRouterConfiguration } from "./routers/graphql/types";
import { JWTConfiguration } from "./middleware/jwt/types";
import {
    ManifestConfiguration,
    ManifestConfigurationIcon
} from "./routers/manifest";
import { StaticFile } from "./routers/static/types";

import { Route } from "../components/route";
import {
    TamlandAppConfig,
    TamlandAppConfigInterface
} from "../app/config";


export interface TamlandServerOptionsInterface {

    /**
     * Required.
     *
     * The React app component that will be rendered as the App
     *
     */
    App: ComponentClass;

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
     * GraphQL configuration.
     *
     */
    graphql?: GraphqlRouterConfiguration;

    /**
     * Required.
     *
     * The hostname the application will be served from. If configured, in production,
     * the application will redirect to this host automatically if it is served
     * from another host. This prevents the application from serving from the appspot.com
     * domain.
     *
     * e.g. www.yourdomain.com
     */
    hostname: string;

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
    routes: Route[];
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

    public App: React.ComponentClass;

    public cacheExpiration: string | number;

    public config: TamlandAppConfig;

    public csp?: IHelmetContentSecurityPolicyConfiguration;

    public graphql?: GraphqlRouterConfiguration;

    public hostname?: string;

    public jwt: JWTConfiguration;

    public manifest: ManifestConfiguration;

    public routes: Route[];

    public staticFiles: StaticFile[];

    public staticFolder: string;

    public xPoweredBy: string;

    public constructor(options: TamlandServerOptionsInterface){

        this.App = options.App;
        this.cacheExpiration = options.cacheExpiration || "1y";
        this.config = new TamlandAppConfig(options.config);
        this.csp = options.csp;
        this.hostname = options.hostname;
        this.jwt = options.jwt || {};
        this.manifest = {
            backgroundColor: this.config.backgroundColor,
            description: this.config.description,
            display: "standalone",
            icons: this.config.icons.map((icon): ManifestConfigurationIcon => ({
                sizes: icon.size.join("x"),
                src: icon.path,
                type: `image/${ path.extname(icon.path) }`
            })),
            name: this.config.name,
            shortName: this.config.shortName,
            startUrl: "/",
            themeColor: this.config.themeColor,
            ...options.manifest || {}
        };
        this.routes = options.routes;
        this.staticFiles = options.staticFiles || [];
        this.staticFolder = options.staticFolder || "static";
        this.xPoweredBy = options.xPoweredBy || "https://www.youtube.com/watch?v=e_DqV1xdf-Y";

    }

}
