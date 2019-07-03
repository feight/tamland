

import { Route } from "../../route";


export interface RouteData{
    test: string;
}


export default class XRoute extends Route{

    public id = "x";

    public path = "/x/";

}
