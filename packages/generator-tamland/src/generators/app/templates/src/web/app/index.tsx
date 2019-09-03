

import * as React from "react";
import {
    Helmet,
    Router
} from "@tamland/web";

import { Footer } from "./footer";
import { Nav } from "./nav";
import style from "./index.module.scss";

import { routes } from "../routes";

import "./index.scss";


export class App extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.app }>
                <Helmet>
                    <title>
                        { "<%= name %>" }
                    </title>
                    <meta content="<%= name %> - <%= description %>" name="description" />
                </Helmet>
                <Nav />
                <div className={ style.page }>
                    <Router routes={ routes } />
                </div>
                <Footer />
            </div>
        );

    }

}

