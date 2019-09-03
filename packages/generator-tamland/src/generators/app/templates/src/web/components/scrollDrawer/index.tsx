

import * as React from "react";

import style from "./index.module.scss";


const supportsPassiveEventListeners = ((): boolean => {

    let supports = false;

    try{

        const options = Object.defineProperty({}, "passive", {
            get(): boolean{

                supports = true;

                return supports;

            }
        });

        window.addEventListener("testPassive", (): boolean => true, options);
        window.removeEventListener("testPassive", (): boolean => true, options);

    }catch(error){}

    return supports;

})();


interface ScrollDrawerState{
    direction: "" | "up" | "down";
    hidden: boolean;
    lastDown: number;
    lastScrollTop: number;
    lastUp: number;
    offset: boolean;
    scrollTop: number;
    top: boolean;
}


export interface ScrollDrawerChangeState{
    hidden: boolean;
    offset: boolean;
    top: boolean;
}


export interface ScrollDrawerProps{
    force: number;
    offsetRatio: number;
    onChange: (state: ScrollDrawerChangeState) => void;
    tollerance: number;
}


export const getScrollTop = function(): number{

    if(typeof window !== "undefined"){

        return window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    }

    return 0;

};


export class ScrollDrawer extends React.Component<ScrollDrawerProps, ScrollDrawerState>{

    public static defaultProps = {
        force: 60,
        offsetRatio: 0.33,
        tollerance: 50
    };

    private readonly timeouts = {
        clear: 0
    };

    public constructor(props: ScrollDrawerProps){

        super(props);

        const scrollTop = getScrollTop();
        const offset = this.getOffset(scrollTop);

        this.state = {
            direction: "",
            hidden: scrollTop !== 0,
            lastDown: 0,
            lastScrollTop: 0,
            lastUp: 0,
            offset,
            scrollTop,
            top: scrollTop === 0
        };

    }

    public componentDidMount(): void{

        /*
         * This has to be done from componentDidMount because it can't be done
         * on the server since there is no document on the server
         */
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            hidden: false,
            lastScrollTop: getScrollTop(),
            scrollTop: getScrollTop()
        });

        document.addEventListener("scroll", (): void => {

            this.onScroll();

        }, supportsPassiveEventListeners ? { passive: true } : false);

        this.props.onChange({
            hidden: this.state.hidden,
            offset: this.state.offset,
            top: this.state.top
        });

    }

    public componentWillUpdate(props: ScrollDrawerProps, state: ScrollDrawerState): void{

        this.props.onChange({
            hidden: state.hidden,
            offset: state.offset,
            top: state.top
        });

    }

    public render(): React.ReactNode{

        const classes = [
            style.scrollDrawer,
            this.state.hidden ? style.hidden : "",
            this.state.top ? style.top : ""
        ]
        .filter(Boolean)
        .join(" ");

        return (
            <nav className={ classes }>
                { this.props.children }
            </nav>
        );

    }

    public shouldComponentUpdate(
        props: ScrollDrawerProps,
        state: ScrollDrawerState
    ): boolean{

        if(
            this.state.direction !== state.direction ||
            this.state.hidden !== state.hidden ||
            this.state.lastScrollTop !== state.lastScrollTop ||
            this.state.offset !== state.offset ||
            this.state.top !== state.top
        ){

            return true;

        }

        return false;

    }

    private atTop(): boolean{

        const scrollTop = getScrollTop();

        return scrollTop <= 0;

    }

    private clear(): void{

        const directionClearTime = 1500;

        window.clearTimeout(this.timeouts.clear);

        /*
         * Forget how much up and down has been happening
         * if nothing happens for a while
         */
        this.timeouts.clear = window.setTimeout((): void => {

            this.setState({
                lastDown: 0,
                lastUp: 0
            });

        }, directionClearTime);

    }

    private getOffset(scrollTop: number): boolean{

        if(typeof window !== "undefined"){

            return scrollTop >= document.documentElement.clientHeight * this.props.offsetRatio;

        }

        return false;

    }

    private goingDown(): boolean{

        return (
            this.state.scrollTop > this.props.force &&
            this.state.lastDown > this.props.tollerance &&
            this.state.direction !== "down"
        );

    }

    private goingUp(): boolean{

        const up = this.state.direction !== "up" && this.state.lastUp > this.props.tollerance;

        return this.state.scrollTop < this.props.force || up;

    }

    private onScroll(): void{

        this.clear();

        const scrollTop = getScrollTop();

        /*
         * If the last scrollTop is 0 set it to the current scroll top. This is
         * necessary because the scrollTop
         */
        const lastScrollTop = this.state.lastScrollTop;

        this.setState({
            scrollTop,
            top: scrollTop === 0
        });

        if(this.atTop()){

            this.setState((previousState): ScrollDrawerState => ({
                ...previousState,
                direction: "up",
                hidden: false
            }));

        }else if(scrollTop < lastScrollTop){

            this.setState((previousState): ScrollDrawerState => ({
                ...previousState,
                lastDown: 0,
                lastUp: previousState.lastUp + (lastScrollTop - scrollTop)
            }));

            if(this.goingUp()){

                this.setState({
                    direction: "up",
                    hidden: false
                });

            }

        }else if(scrollTop > lastScrollTop){


            this.setState((previousState): ScrollDrawerState => ({
                ...previousState,
                lastDown: previousState.lastDown + (scrollTop - lastScrollTop),
                lastUp: 0
            }));

            if(this.goingDown()){

                this.setState({
                    direction: "down",
                    hidden: true
                });

            }

        }

        this.setState({
            lastScrollTop: scrollTop,
            offset: this.getOffset(scrollTop)
        });

    }

}
