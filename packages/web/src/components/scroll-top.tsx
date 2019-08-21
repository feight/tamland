

import React from "react";


const startTime = typeof window === "undefined" ? 0 : new Date().getTime();
const minimumScrollTime = 100;


// Needed for other eslint plugins to understand about the components props
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
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
