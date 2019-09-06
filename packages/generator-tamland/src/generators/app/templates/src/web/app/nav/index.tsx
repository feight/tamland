

import * as React from "react";
import { Link } from "@tamland/web";
import { Drawer } from "@tamland/web-components/lib/drawer";
import { Toggle } from "@tamland/web-components/lib/toggle";
import {
    getScrollTop,
    ScrollDrawer,
    ScrollDrawerChangeState
} from "@tamland/web-components/lib/scrollDrawer";

import style from "./index.module.scss";
import drawerClasses from "./drawer.module.scss";
import scrollDrawerClasses from "./scrollDrawer.module.scss";
import { Hamburger } from "./hamburger";

import { Logo } from "../logo/newsteam";


interface NavState{
    drawerOpen: boolean;
    hidden: boolean;
    offset: boolean;
    top: boolean;
}


export class Nav extends React.Component<{}, NavState>{

    public constructor(props: {}){

        super(props);

        this.state = {
            drawerOpen: false,
            hidden: false,
            offset: false,
            top: getScrollTop() === 0
        };

        this.handleHamburgerToggleOnChange = this.handleHamburgerToggleOnChange.bind(this);
        this.handleDrawerOnChange = this.handleDrawerOnChange.bind(this);
        this.handleScrollDrawerOnChange = this.handleScrollDrawerOnChange.bind(this);

    }

    public render(): React.ReactNode{

        const classes = [
            style.nav,
            this.state.hidden ? style.hidden : "",
            this.state.offset ? style.offset : "",
            this.state.top ? style.top : ""
        ]
        .filter(Boolean)
        .join(" ");

        const drawerOpen = this.state.drawerOpen;

        return (
            <div>
                <ScrollDrawer
                    classes={ scrollDrawerClasses }
                    force={ 100 }
                    onChange={ this.handleScrollDrawerOnChange }
                >
                    <div className={ classes }>
                        <div className={ style.logoWrap }>
                            <Link to="/">
                                <Logo fill="#fff" />
                            </Link>
                        </div>
                        <div />
                        <div className={ style.hamburgerWrap }>
                            <Toggle
                                onChange={ this.handleHamburgerToggleOnChange }
                                value={ drawerOpen }
                            >
                                <Hamburger fill="#fff" />
                            </Toggle>
                        </div>
                    </div>
                </ScrollDrawer>
                <Drawer
                    classes={ drawerClasses }
                    onChange={ this.handleDrawerOnChange }
                    open={ drawerOpen }
                    side="right"
                >
                    <p>
                        { "things in my drawer" }
                    </p>
                </Drawer>
            </div>
        );

    }

    private readonly handleScrollDrawerOnChange = (state: ScrollDrawerChangeState): void => {

        this.setState((navState: NavState): NavState => ({
            ...navState,
            hidden: state.hidden,
            offset: state.offset,
            top: state.top
        }));

    };

    private readonly handleDrawerOnChange = (open: boolean): void => {

        this.setState({
            drawerOpen: open
        });

    };

    private readonly handleHamburgerToggleOnChange = (open: boolean): void => {

        this.setState({
            drawerOpen: open
        });

    };

}
