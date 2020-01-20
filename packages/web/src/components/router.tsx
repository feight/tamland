

import loadable from "@loadable/component";
import {
    Switch,
    Route as ReactRouterDomRoute
} from "react-router-dom";
import React from "react";

import { PageProps } from "./page";


export interface TamlandRoute{
    exact?: boolean;
    id: string;
    loading?: () => React.ReactNode;
    path: string;
    sensitive?: boolean;
    strict?: boolean;
}

export interface RouterProps{
    import: (id: string) => () => Promise<{ default: React.ComponentType<PageProps> }>;
    routes: TamlandRoute[];
}


const render = (route: TamlandRoute,
    loadableImport: RouterProps["import"]): React.ReactNode => {

    const {
        exact = true,
        id,
        path,
        loading,
        sensitive = true,
        strict = true
    } = route;

    return (
        <ReactRouterDomRoute
            exact={ exact }
            key={ path }
            path={ path }

            /*
             * We're going to let this one slide for now, because we need to override
             * the render method and I can't think of how to do this without a function
             */
            render={ // eslint-disable-line react/jsx-no-bind

                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                ({ match }): React.ReactNode => {

                    const pageProps = { match };
                    const loadableComponent = loadableImport(id);

                    const Page = loadable(loadableComponent, {
                        fallback:
    <div>
        { loading ? loading() : "Loading..." }
    </div>,
                        ssr: true
                    });

                    return (
                        // This is safe enough to we'll take the convenience here
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <Page { ...pageProps } />
                    );

                }

            }
            sensitive={ sensitive }
            strict={ strict }
        />
    );

};


// eslint-disable-next-line react/no-multi-comp
export class Router extends React.Component<RouterProps>{

    shouldComponentUpdate(): boolean{

        return true;

    }

    render(): React.ReactNode{

        return (
            <Switch>
                { this.props.routes.map((instance): React.ReactNode => render(instance, this.props.import)) }
            </Switch>
        );

    }

}
