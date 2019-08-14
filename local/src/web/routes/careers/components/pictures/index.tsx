

import React from "react";

import style from "./index.module.scss";


export class Pictures extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.pictures }>

                <h2>
                    { "Pictures" }
                </h2>

            </div>
        );

    }

}
