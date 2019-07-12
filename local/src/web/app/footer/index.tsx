

import * as React from "react";
import { romanize } from "@ionaru/romanize";
import { Link } from "@tamland/web";

import style from "./index.module.scss";


export class Footer extends React.PureComponent<{
    offset?: boolean;
}>{

    public componentDidMount(): void{

        this.update();

    }

    public componentDidUpdate(): void{

        this.update();

    }

    public render(): React.ReactNode{

        return (
            <div className={ style.footer }>
                <ul>
                    <li>
                        <Link to="/about/">
                            { "About" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/careers/">
                            { "Careers" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact/">
                            { "Contact" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/cosmos/">
                            { "Cosmos" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            { "Home" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/page-not-found/">
                            { "Page not found" }
                        </Link>
                    </li>
                </ul>
                <p>
                    { `News Team © ${ romanize(new Date().getFullYear()) }` }
                </p>
            </div>
        );

    }

    private update(): void {

        document.documentElement.classList.toggle("offset", this.props.offset);

    }

}
