

import * as React from "react";
import { Link } from "@tamland/web";

import style from "./index.module.scss";


export class Footer extends React.PureComponent<{
    offset?: boolean;
}>{

    public render(): React.ReactNode{

        return (
            <div className={ style.footer }>
                <p>
                    <Link to="/">
                        { "News Team" }
                    </Link>
                    { ` © ${ new Date().getFullYear() }` }
                </p>
            </div>
        );

    }

}
