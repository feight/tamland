

import * as React from "react";

import {
    Component,
    ComponentProps
} from "../component";


interface DrawerProps extends ComponentProps{
    side?: "left" | "right" | "top" | "bottom";
    onChange: (open: boolean) => void;
    open?: boolean;
}

interface DrawerState{
    horizontal: boolean;
    open: boolean;
    touchCurrentX: number;
    touchCurrentY: number;
    touching: boolean;
    touchStartHeight: number;
    touchStartWidth: number;
    touchStartX: number;
    touchStartY: number;
}


const config = {
    closeRatio: 5
};


export class Drawer extends Component<DrawerProps, DrawerState>{

    private readonly baseRef: React.RefObject<HTMLDivElement>;

    private readonly closeRef: React.RefObject<HTMLDivElement>;

    private readonly wrapRef: React.RefObject<HTMLDivElement>;

    public constructor(props: DrawerProps){

        super(props);

        this.state = {
            horizontal: props.side === "left" || props.side === "right",
            open: props.open || false,
            touchCurrentX: 0,
            touchCurrentY: 0,
            touching: false,
            touchStartHeight: 0,
            touchStartWidth: 0,
            touchStartX: 0,
            touchStartY: 0
        };

        this.handleCloseOnClick = this.handleCloseOnClick.bind(this);
        this.handleDrawerOnClick = this.handleDrawerOnClick.bind(this);
        this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
        this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
        this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
        this.touchUpdate = this.touchUpdate.bind(this);
        this.toggle = this.toggle.bind(this);
        this.block = this.block.bind(this);

        this.baseRef = React.createRef();
        this.closeRef = React.createRef();
        this.wrapRef = React.createRef();

    }

    public render(): React.ReactNode{

        this.updateTouchMoveBlock();

        const classes = [
            this.props.classes.drawer,
            this.props.open ? this.props.classes.open : "",
            this.getSideClass()
        ].filter(Boolean)
        .join(" ");

        return (
            <div
                className={ classes }
                ref={ this.baseRef }
            >
                <div className={ this.props.classes.wrap } ref={ this.wrapRef }>
                    <div className={ this.props.classes.contentWrap }>
                        <div className={ this.props.classes.content }>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    public componentDidMount(): void{

        const base = this.baseRef.current;
        const close = this.closeRef.current;
        const wrap = this.wrapRef.current;

        if(wrap){

            wrap.addEventListener("touchstart", this.handleOnTouchStart, this.features.passiveEventListeners ? { passive: true } : false);
            wrap.addEventListener("touchmove", this.handleOnTouchMove, this.features.passiveEventListeners ? { passive: true } : false);
            wrap.addEventListener("touchend", this.handleOnTouchEnd);
            wrap.addEventListener("click", this.block);

        }

        if(base){

            base.addEventListener("click", this.toggle);

        }

        if(close){

            close.addEventListener("click", this.toggle);

        }

    }

    public componentWillUnmount(): void{

        const base = this.baseRef.current;
        const close = this.closeRef.current;
        const wrap = this.wrapRef.current;

        if(wrap){

            wrap.removeEventListener("touchstart", this.handleOnTouchStart);
            wrap.removeEventListener("touchmove", this.handleOnTouchMove);
            wrap.removeEventListener("touchend", this.handleOnTouchEnd);
            wrap.removeEventListener("click", this.block);

        }

        if(base){

            base.removeEventListener("click", this.toggle);

        }

        if(close){

            close.removeEventListener("click", this.toggle);

        }

    }

    private updateTouchMoveBlock(): void{

        if(typeof window !== "undefined"){

            document.documentElement.classList[this.props.open ? "add" : "remove"]("drawer-open");

            const block = (event: TouchEvent): void => {

                let isTouchMoveAllowed = true;
                let target = event.currentTarget as (HTMLElement) | null;

                if(target){

                    // Makes sense to use a while loop here.
                    // eslint-disable-next-line no-loops/no-loops
                    while(target !== null){

                        if(
                            target.classList.contains("drawer-open")
                        ){

                            isTouchMoveAllowed = false;

                            break;

                        }

                        target = target.parentNode as HTMLElement;

                    }

                    if(!isTouchMoveAllowed){
                        event.preventDefault();
                    }

                }


            };

            if(this.props.open){
                document.documentElement.addEventListener("touchmove", block);
            }else{
                document.documentElement.removeEventListener("touchmove", block);
            }

        }

    }

    private getSideClass(): string{

        switch(this.props.side){

            case "left" :

                return this.props.classes.sideLeft;

            case "right" :

                return this.props.classes.sideRight;

            case "bottom" :

                return this.props.classes.sideBottom;

            case "top" :

                return this.props.classes.sideTop;

            default :

                return "";

        }

    }

    private readonly block = (event: Event): void => {

        event.stopPropagation();

    };

    private getTranslateX(): number{

        if(this.props.side === "left"){

            return Math.min(0, this.state.touchCurrentX - this.state.touchStartX);

        }

        return Math.min(0, this.state.touchStartX - this.state.touchCurrentX) * -1;

    }

    private getTranslateY(): number{

        if(this.props.side === "top"){

            return Math.min(0, this.state.touchCurrentY - this.state.touchStartY);

        }

        return Math.min(0, this.state.touchStartY - this.state.touchCurrentY) * -1;

    }

    private readonly handleCloseOnClick = (): void => {

        this.toggle();

    };

    private readonly handleDrawerOnClick = (): void => {

        this.toggle();

    };

    private readonly handleOnTouchEnd = (): void => {

        if(!this.state.touching){
            return;
        }

        this.setState({
            touching: false
        });

        const translate = this[this.state.horizontal ? "getTranslateX" : "getTranslateY"]();
        const wrap = this.wrapRef.current;

        if(wrap){

            wrap.style.transform = "";

        }

        const trigger = ((): boolean => {

            if(this.state.horizontal){

                return translate * (this.props.side === "left" ? -1 : 1) > this.state.touchStartWidth / config.closeRatio;

            }

            return translate * (this.props.side === "top" ? -1 : 1) > this.state.touchStartHeight / config.closeRatio;

        })();

        this.props.onChange(!trigger);

    };

    private readonly handleOnTouchMove = (event: TouchEvent): void => {

        if(!this.state.touching){
            return;
        }

        if(this.state.horizontal){

            this.setState({
                touchCurrentX: event.touches[0].pageX
            });

        }else{

            this.setState({
                touchCurrentY: event.touches[0].pageY
            });

        }

    };

    private readonly handleOnTouchStart = (event: TouchEvent): void => {

        const wrap = this.wrapRef.current;

        if(wrap){

            if(this.state.horizontal){

                this.setState((state): DrawerState => ({
                    ...state,
                    touchCurrentX: state.touchStartX,
                    touching: true,
                    touchStartWidth: wrap.offsetWidth,
                    touchStartX: event.touches[0].pageX
                }));

            }else{

                this.setState((state): DrawerState => ({
                    ...state,
                    touchCurrentY: state.touchStartY,
                    touching: true,
                    touchStartHeight: wrap.offsetHeight,
                    touchStartY: event.touches[0].pageY
                }));

            }

            requestAnimationFrame(this.touchUpdate);

        }

    };

    private readonly touchUpdate = (): void => {

        const wrap = this.wrapRef.current;

        if(this.state.touching){

            requestAnimationFrame(this.touchUpdate);

            if(wrap){

                wrap.style.transform = ((): string => {

                    if(this.state.horizontal){
                        return `translate3d(${ this.getTranslateX() }px, 0, 0)`;
                    }

                    return `translate3d(0, ${ this.getTranslateY() }px, 0)`;

                })();

            }

        }

    };

    private readonly toggle = (): void => {

        this.props.onChange(!this.props.open);

    };

}
