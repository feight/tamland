

import React from "react";
import { Helmet } from "@tamland/core";

import style from "./page.module.scss";

import logo from "../../app/images/logo/newsteam.svg";


export default class Page extends React.PureComponent{

    public render(): JSX.Element{

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
