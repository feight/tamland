

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
                        { "News Team" }
                    </title>
                    <meta content="Newsteam.io - News tools that scale" name="description" />
                </Helmet>
                <Nav />
                <div className={ style.page }>
                    <Router
                        loader={ this.props.loader }
                        routes={ this.props.routes }
                    />
                </div>
                <Footer />
            </div>
        );

    }

}

