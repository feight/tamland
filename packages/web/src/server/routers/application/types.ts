
import { RouteProps } from "react-router-dom";

import { TamlandAppConfig } from "../../../app/config";


export interface AppRouterConfiguration {
    App: React.ComponentClass;
    config: TamlandAppConfig;
    local: boolean;
    routes: RouteProps[];
}
