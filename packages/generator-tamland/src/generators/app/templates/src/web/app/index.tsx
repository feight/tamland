

import * as React from "react";
import {
    Application,
    Helmet,
    Router
} from "@tamland/web";

import { Footer } from "./footer";
import { Nav } from "./nav";
import style from "./index.module.scss";

import "./index.scss";


export class App extends Application{

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
                    { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
                    <Router { ...this.props.router } />
                </div>
                <Footer />
            </div>
        );

    }

}

