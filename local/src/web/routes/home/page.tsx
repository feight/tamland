

import React from "react";
import { Page } from "@tamland/web";

import style from "./page.module.scss";
import { logos } from "./logos";


export default class HomePage extends Page{

    public render(): React.ReactNode{

        return (
            <div className={ style.page }>
                <div className={ style.splash }>
                    <div className={ style.splashWrap }>
                        <h1>
                            { "News tools that scale" }
                        </h1>
                        <p>
                            { `
                                Grow your publication with an easy to use platform
                                that adapts to fit any audience.
                            ` }
                        </p>
                    </div>
                </div>
                <div className={ style.publications }>
                    <div className={ style.publicationsWrap }>
                        { logos.map((item): React.ReactNode => (
                            <a
                                href={ item.link }
                                key={ item.logo }
                                rel="noopener noreferrer"
                                target="new"
                                title={ item.name }
                            >
                                <span
                                    style={
                                        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                                        {
                                            backgroundImage: `url(${ item.logo })`,
                                            width: item.width ? `${ item.width }px` : ""
                                        }
                                    }
                                />
                            </a>
                        )) }
                    </div>
                </div>
            </div>
        );

    }

}
