

import * as React from "react";
import express from "express";
import parseurl from "parseurl";
import PropTypes from "prop-types";
import {
    Helmet,
    HelmetProvider
} from "react-helmet-async";
import {
    History,
    Location
} from "history";
import { Store } from "redux";
import { Provider as ReduxProvider } from "react-redux";

import { Router } from "./router";

import { Modernizr } from "../modernizr";


export interface TamlandProps{
    helmetContext?: {} | undefined;
    history: History;
    language: string;
    request?: express.Request;
    store: Store;
}

interface BodyAttributes{
    class: string;
}

interface HtmlAttributes{
    lang: string;
}


const context = {};


export class Tamland extends React.PureComponent<TamlandProps>{

    public static defaultProps = {
        language: "en"
    };

    public static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
        language: PropTypes.string
    };

    public location: Location;

    public constructor(props: TamlandProps){

        super(props);

        const loc = (this.props.request ? parseurl(this.props.request) : window.location) || {};

        this.location = {
            hash: loc.hash || "",
            pathname: loc.pathname || "",
            search: loc.search || "",
            state: {}
        };

    }

    public getBodyAttributes(): BodyAttributes{

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
            lang: this.props.language
        };

    }

    public render(): JSX.Element{

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
                    </Helmet>
                    <Router
                        context={ context }
                        history={ this.props.history }
                        location={ this.location }
                    >
                        { this.props.children }
                    </Router>
                </HelmetProvider>
            </ReduxProvider>
        );

    }

}

