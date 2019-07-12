

import React from "react";
import { Helmet } from "@tamland/web";

import style from "./page.scss";


export default class Page extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.page }>
                <Helmet>
                    <title>
                        { "homex" }
                    </title>
                    <meta content="BusinessLIVE" property="og:site_name" />
                </Helmet>
                { "NEWx CONTENT" }
            </div>
        );

    }

}
