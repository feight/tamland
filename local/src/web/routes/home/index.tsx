

import { Route } from "../../route";


export interface RouteData{
    test: string;
}


export class HomeRoute extends Route{

    public id = "home";

    public path = "/";

    public getData(): Promise<RouteData>{

        return new Promise((resolve): void => {

            resolve({
                test: "Home page"
            });

        });

    }

}
