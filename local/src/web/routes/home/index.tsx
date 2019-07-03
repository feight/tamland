

import { Route } from "../../route";


export interface RouteData{
    test: string;
}


export default class HomeRoute extends Route{

    public id = "home";

    public path = "/";

}
