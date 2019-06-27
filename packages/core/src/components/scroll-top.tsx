

import React from "react";


const isServer = !(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
);

const startTime = isServer ? 0 : new Date().getTime();
const minimumScrollTime = 100;


export class ScrollTop extends React.PureComponent<{}>{

    public componentDidMount(): void{

        /*
         * When a user reloads their page after scrolling, we don't want to set
         * the scrollTop to 0 so we only set the set the scroll top if enough
         * time has passed since the module was initially loaded.
         */
        if(new Date().getTime() - startTime > minimumScrollTime){

            window.scrollTo(0, 0);

        }

    }

    public render(): React.ReactNode{

        return this.props.children;

    }

}
