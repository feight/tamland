

import { Route } from "../route";


export interface RouteData{
    test: string;
}


export class PageNotFoundRoute extends Route{

    public id = "pageNotFound";

    public path = "*";

}
