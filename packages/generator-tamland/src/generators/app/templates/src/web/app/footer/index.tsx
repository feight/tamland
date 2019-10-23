

import * as React from "react";
import { Link } from "@tamland/web";
import { Romanize } from "@tamland/web-components/lib/romanize";

import style from "./index.module.scss";


export class Footer extends React.PureComponent<{
    offset?: boolean;
}>{

    public render(): React.ReactNode{

        return (
            <div className={ style.footer }>
                <p>
                    <Link to="/">
                        { "<%= name %>" }
                    </Link>
                    { " © " }
                    <Romanize number={ new Date().getFullYear() } />
                </p>
            </div>
        );

    }

}
