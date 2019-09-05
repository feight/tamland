

import * as React from "react";
import {
    Helmet,
    Router
} from "@tamland/web";

import { Footer } from "./footer";
import { Nav } from "./nav";
import style from "./index.module.scss";

import config from "../config";

import "./index.scss";

/*
 * DO NOT MODIFY
 *
 * This method is used to marshal the routes page as a loadable component so
 * that client code splitting works seamlessly with server rendering. It has
 * to exist in the project context because webpack dynamic imports don't work
 * when they're made in modules inside node_modules. It's not a good idea to
 * modify this.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loader = function(id: string): () => Promise<{ default: React.ComponentType<any> }>{

    // eslint-disable-next-line no-inline-comments, @typescript-eslint/no-explicit-any
    return /* #__LOADABLE__ */ (): Promise<{ default: React.ComponentType<any> }> => import(

        /* webpackChunkName: "[request]" */
        `./../routes/${ id }/page`
    );

};


export class App extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.app }>
                <Helmet>
                    <title>
                        { "News Team" }
                    </title>
                    <meta content="Newsteam.io - News tools that scale" name="description" />
                </Helmet>
                <Nav />
                <div className={ style.page }>
                    <Router loader={ loader } routes={ config.routes } />
                </div>
                <Footer />
            </div>
        );

    }

}

