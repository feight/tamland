

import React from "react";

import style from "./index.module.scss";
import { logos } from "./logos";


export class Publications extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.publications }>
                <div className={ style.publicationsWrap }>
                    { logos.map((logo): React.ReactNode => (
                        <a
                            href={ logo.link }
                            key={ logo.logo }
                            rel="noopener noreferrer"
                            target="new"
                            title={ logo.name }
                        >
                            <span
                                style={ {
                                    backgroundImage: `url(${ logo.logo })`,
                                    width: logo.width ? `${ logo.width }px` : ""
                                } }
                            />
                        </a>
                    )) }
                </div>
            </div>
        );

    }

}
