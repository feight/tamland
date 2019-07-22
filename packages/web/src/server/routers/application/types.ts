

import { TamlandAppConfig } from "../../../app/config";
import { Route } from "../../../components/route";


export interface AppRouterConfiguration {
    App: React.ComponentClass;
    config: TamlandAppConfig;
    local: boolean;
    routes: Route[];
}
