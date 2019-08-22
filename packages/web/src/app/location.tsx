

import React from "react";
import {
    withRouter,
    match
} from "react-router";
import {
    History,
    Location as HistoryLocation
} from "history";


export interface LocationProps{
    context: {} | undefined;
    history: History;
    location: HistoryLocation;
    match: match;
}

class ShowTheLocation extends React.PureComponent<LocationProps>{

    public componentDidUpdate(previous: LocationProps): void{

        if(previous.location.pathname !== this.props.location.pathname){

            window.scrollTo(0, 0);

        }

    }

    public render(): React.ReactNode{

        return (
            <div />
        );

    }

}

export const Location = withRouter(ShowTheLocation);
