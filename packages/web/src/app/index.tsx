

import * as React from "react";
import parseurl from "parseurl";
import PropTypes from "prop-types";
import {
    Helmet,
    HelmetProvider
} from "react-helmet-async";
import {
    Location as HistoryLocation,
    History
} from "history";
import { Provider as ReduxProvider } from "react-redux";
import { Request } from "express";
import { Store } from "redux";
import { hot } from "react-hot-loader";

import { TamlandAppConfig } from "./config";
import { Router } from "./router";
import { Location } from "./location";


const context = {};


export interface TamlandProps{
    config: TamlandAppConfig;
    helmetContext?: {} | undefined;
    history: History;
    request?: Request;
    store: Store;
}


export interface BodyAttributes{
    class: string;
}


export interface HtmlAttributes{
    lang: string;
}


class TamlandApp extends React.PureComponent<TamlandProps>{

    public static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
    };

    public config: TamlandAppConfig;

    public location: HistoryLocation;

    public constructor(props: TamlandProps){

        super(props);

        const loc = (this.props.request ? parseurl(this.props.request) : window.location) || {};

        this.config = new TamlandAppConfig(this.props.config);

        this.location = {
            hash: loc.hash || "",
            pathname: loc.pathname || "",
            search: loc.search || "",
            state: {}
        };

    }

    public getBodyAttributes(): BodyAttributes{

        // Needed so that webpack won't require this on the server, since it's a client only module
        // eslint-disable-next-line node/no-missing-require, @typescript-eslint/no-require-imports, global-require
        const Modernizr = typeof window === "undefined" ? {} : require("modernizr");

        const classes = [
            typeof window === "undefined" ? "" : "mounted"
        ].concat(Object.keys(Modernizr).map((feature: string): string => `feature-detect-${ feature }`))
        .filter(Boolean)
        .join(" ");

        return {
            class: classes
        };

    }

    public getHtmlAttributes(): HtmlAttributes{

        return {
            lang: this.props.config.language
        };

    }

    public render(): React.ReactNode{

        return (
            <ReduxProvider store={ this.props.store }>
                <HelmetProvider context={ this.props.helmetContext }>
                    <Helmet
                        bodyAttributes={ this.getBodyAttributes() }
                        htmlAttributes={ this.getHtmlAttributes() }
                    >
                        <title>
                            {

                                /*
                                 * This needs to be an empty space so that if a
                                 * Route doesn't implement a title the title is
                                 * blanked out
                                 */
                            }
                            { " " }
                        </title>
                        <link href="/manifest.json" rel="manifest" />
                    </Helmet>
                    <Router
                        context={ context }
                        history={ this.props.history }
                        location={ this.location }
                    >
                        <Location context={ context } />
                        { this.props.children }
                    </Router>
                </HelmetProvider>
            </ReduxProvider>
        );

    }

}

export const Tamland = hot(module)(TamlandApp);
