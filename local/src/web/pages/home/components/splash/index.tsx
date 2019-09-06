

import React from "react";

import style from "./index.module.scss";
import cloud from "./images/cloud.svg";
import newspaper from "./images/newspaper.svg";
import rocket from "./images/rocket.svg";


const stats: {
    image: string;
    text: string;
}[] = [
    {
        image: rocket,
        text: "Serving over 70 million page views per month"
    },
    {
        image: newspaper,
        text: "Powering 15 publications internationally"
    },
    {
        image: cloud,
        text: "Hosted in the cloud from $100 per month"
    }
];


export class Splash extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.splash }>
                <div className={ style.splashWrap }>
                    <div>
                        <div className={ style.splashContent }>
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
                        <div className={ style.stats }>
                            { stats.map((stat): React.ReactNode => (
                                <div
                                    className={ style.stat }
                                    key={ stat.image }
                                >
                                    <div className={ style.imageWrap }>
                                        <img
                                            alt={ stat.text }
                                            src={ stat.image }
                                        />
                                    </div>
                                    <div className={ style.imageText }>
                                        { stat.text }
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}
