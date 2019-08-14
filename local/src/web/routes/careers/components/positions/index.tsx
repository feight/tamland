

import React from "react";

import style from "./index.module.scss";


export class Positions extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.positions }>

                <h2>
                    { "Positions" }
                </h2>

            </div>
        );

    }

}
