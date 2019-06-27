

import React from "react";
import { Page } from "@tamland/core";

import style from "./page.scss";


export default class XPage extends Page{

    public render(): JSX.Element{

        return (
            <div className={ style.page }>
                { "X PAGE | BABOOOM BITCH TITS" }
            </div>
        );

    }

}
