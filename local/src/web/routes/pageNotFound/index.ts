

import { Route } from "../../route";


export interface RouteData{
    test: string;
}


export default class PageNotFoundRoute extends Route{

    public id = "pageNotFound";

    public path = "*";

}
