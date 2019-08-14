

import React from "react";

import style from "./index.module.scss";


export class Contact extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.contact }>
                <div className={ style.contactContent }>
                    <h2>
                        { "Contact our sales team"}
                    </h2>
                    <p>
                        { `
                            We're excited to show you how News Team can help
                            grow your digital news business.
                        ` }
                    </p>
                    <p>
                        { `
                            Drop us a message at...
                        ` }
                    </p>
                    <h3>
                        <a
                            href="mailto:hello@newsteam.io"
                            rel="noopener noreferrer"
                            target="new"
                        >
                            { "hello@newsteam.io" }
                        </a>
                    </h3>
                </div>
            </div>
        );

    }

}
