

import * as React from "react";
import {
    History,
    Location
} from "history";


export interface RouterProps{
    context: {} | undefined;
    history: History;
    location: Location;
}


export class BaseRouter extends React.PureComponent<RouterProps, {}>{}
