

import React from "react";
import {
    Helmet,
    Modernizr
} from "@tamland/core";

import style from "./page.scss";

import logo from "../../app/images/logo/newsteam.svg";


export default class Page extends React.PureComponent{

    public render(): JSX.Element{

        console.log(Modernizr);

        return (
            <div className={ style.page }>
                <Helmet>
                    <title>
                        { "News Team" }
                    </title>
                </Helmet>
                <img src={ `${ logo }` } />
            </div>
        );

    }

}
