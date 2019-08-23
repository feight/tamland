

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
                        { "News Team" }
                    </title>
                    <meta content="Newsteam.io - News tools that scale" name="description" />
                    <meta content="MM63KQdfrn3d7XEwLwcXYZLTmWK4kbGmuJwsO4QUryA" name="google-site-verification" />
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

