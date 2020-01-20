

import * as React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import parseurl from "parseurl";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import {
    Location as HistoryLocation,
    History
} from "history";
import { Provider as ReduxProvider } from "react-redux";
import { Request } from "express";
import { Store } from "redux";
import { hot } from "react-hot-loader";
import { ApolloClient } from "apollo-client";

import { TamlandAppConfig } from "./config";
import { Router } from "./router";
import { Location } from "./location";


const context = {};


export interface TamlandProps{
    apolloClient: ApolloClient<{}>;
    config: TamlandAppConfig;
    helmetContext?: {} | undefined;
    history: History;
    request?: Request;
    store: Store;
}


type HtmlProps = JSX.IntrinsicElements["html"] & {
    [key: string]: string;
};


type BodyProps = JSX.IntrinsicElements["body"] & {
    [key: string]: string;
};


class TamlandApp extends React.PureComponent<TamlandProps>{

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
    };

    config: TamlandAppConfig;

    location: HistoryLocation;

    constructor(props: TamlandProps){

        super(props);

        const loc = this.props.request ? parseurl(this.props.request) : window.location;

        this.config = new TamlandAppConfig(this.props.config);

        this.location = {
            hash: loc ? loc.hash ?? "" : "",
            pathname: loc ? loc.pathname ?? "" : "",
            search: loc ? loc.search ?? "" : "",
            state: {}
        };

    }

    render(): React.ReactNode{

        return (

            <ApolloProvider client={ this.props.apolloClient }>

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
                                     * blanked out. The curly brace is necessary.
                                     */
                                }
                                { " " }
                            </title>

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

            </ApolloProvider>

        );

    }

    private getBodyAttributes(): BodyProps{

        // Needed so that webpack won't require this on the server, since it's a client only module
        // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
        const modernizr = typeof window === "undefined" ? {} : require("modernizr");

        const classes = [
            typeof window === "undefined" ? "" : "mounted"
        ].concat(Object.keys(modernizr).map((feature: string): string => `feature-detect-${ feature }`))
        .filter(Boolean)
        .join(" ");

        return {
            className: classes
        };

    }

    private getHtmlAttributes(): HtmlProps{

        return {
            lang: this.props.config.language
        };

    }

}

export const Tamland = hot(module)(TamlandApp);
