
import { TamlandAppConfig } from "../../../app/config";
import { Application } from "../../../components/application";
import { TamlandRoute } from "../../../components/router";


export interface AppRouterConfiguration {
    App: Application;
    config: TamlandAppConfig;
    local: boolean;
    routes: TamlandRoute[];
}
