

import React from "react";

import style from "./index.module.scss";


export class About extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.about }>

                <h2>
                    { "About" }
                </h2>

                <h3>
                    { "What we do" }
                </h3>

                <p>
                    { `
                        We are a young, but well established start up focusing on custom
                        publishing tools and systems. We develop software for major players
                        in the media industry.
                    ` }
                </p>

                <h3>
                    { "Why Work For Us" }
                </h3>

                <p>
                    { `
                        The company is managed exclusively by engineers and therefore has
                        a strong focus on code quality.
                        We offer all the usual perks and much more. We're a down to earth
                        team who want to produce the best products.
                    ` }
                </p>

                <h3>
                    { "Our Culture" }
                </h3>

                <p>
                    { `
                        We encourage a fun, relaxed atmosphere that is conducive to productivity
                        as well as overall happiness and wellbeing.
                    ` }
                </p>

                <h3>
                    { "Our Engineering Processes" }
                </h3>

                <p>
                    { `
                        We aim to offer our clients well thought out solutions. We try not
                        to get caught up in corporate processes that waste time. Our goal
                        is to deliver high quality work efficiently.
                    ` }
                </p>

                <h3>
                    { "Our Hiring Process" }
                </h3>

                <p>
                    { `
                        We want engaged thinkers who push technological boundaries and contribute
                        meaningful code.
                        Our hiring process will include an interview with our three directors
                        as well as a technical assessment where your quality of code will be reviewed.
                    ` }
                </p>


            </div>
        );

    }

}
