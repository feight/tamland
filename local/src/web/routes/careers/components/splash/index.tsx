

import React from "react";

import style from "./index.module.scss";


export class Splash extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.splash }>
                <div className={ style.splashWrap }>

                    <h1>
                        { "Careers" }
                    </h1>

                </div>
            </div>
        );

    }

}
