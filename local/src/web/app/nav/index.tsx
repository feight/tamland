

import * as React from "react";
import { Link } from "@tamland/web";

import style from "./index.module.scss";
import drawerStyle from "./drawer.module.scss";
import { Hamburger } from "./hamburger";

import { Logo } from "../logo/newsteam";
import { Toggle } from "../../components/toggle";
import { Drawer } from "../../components/drawer";
import {
    getScrollTop,
    ScrollDrawer,
    ScrollDrawerChangeState
} from "../../components/scrollDrawer";


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
                    onChange={ this.handleDrawerOnChange }
                    open={ drawerOpen }
                    side="right"
                    styleModule={ drawerStyle }
                >
                    <p>
                        { "things in my drawer" }
                    </p>
                </Drawer>
            </div>
        );

    }

    private handleScrollDrawerOnChange = (state: ScrollDrawerChangeState): void => {

        this.setState((navState: NavState): NavState => ({
            ...navState,
            hidden: state.hidden,
            offset: state.offset,
            top: state.top
        }));

    };

    private handleDrawerOnChange = (open: boolean): void => {

        this.setState({
            drawerOpen: open
        });

    };

    private handleHamburgerToggleOnChange = (open: boolean): void => {

        this.setState({
            drawerOpen: open
        });

    };

}
