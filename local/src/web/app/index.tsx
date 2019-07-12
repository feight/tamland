

import * as React from "react";
import {
    Helmet,
    Modernizr,
    Router
} from "@tamland/web";

import { Footer } from "./footer";
import { Nav } from "./nav";
import style from "./index.module.scss";

import { routes } from "../routes";

import "./index.scss";


export class App extends React.PureComponent<{}, AppState>{

    public render(): React.ReactNode{

        const classes = [
            typeof window === "undefined" ? "" : "mounted",
            Modernizr.backdropfilter ? "feature-detect-backdropfilter" : ""
        ].filter(Boolean)
        .join(" ");

        return (
            <div className={ style.app }>
                <Helmet
                    bodyAttributes={ {
                        class: classes
                    } }
                />
                <Nav />
                <div className={ style.page }>
                    <Router routes={ routes } />
                </div>
                <Footer />
            </div>
        );

    }

}

