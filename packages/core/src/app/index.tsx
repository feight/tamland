

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


export interface TamlandProps{
    helmetContext?: {} | undefined;
    history: History;
    request?: express.Request;
    store: Store;
}


const context = {};


export class Tamland extends React.PureComponent<TamlandProps>{

    public static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
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

    public render(): JSX.Element{

        return (
            <ReduxProvider store={ this.props.store }>
                <HelmetProvider context={ this.props.helmetContext }>
                    <Helmet>
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

