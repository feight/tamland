

import loadable from "@loadable/component";
import {
    Switch,
    Route as ReactRouterDomRoute
} from "react-router-dom";
import React from "react";


export interface TamlandRoute{
    exact?: boolean;
    id: string;
    loading?: () => React.ReactNode;
    path: string;
    sensitive?: boolean;
    strict?: boolean;
}


const render = function(
    route: TamlandRoute,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loader: (id: string) => () => Promise<{ default: React.ComponentType<any> }>
): React.ReactNode{

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
                    const loadableComponent = loader(id);

                    if(loadableComponent){

                        const Page = loadable(loadableComponent, {
                            fallback: (
                                <div>
                                    { loading ? loading() : "Loading..." }
                                </div>
                            ),
                            ssr: true
                        });

                        return (
                            // This is safe enough to we'll take the convenience here
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            <Page { ...pageProps } />
                        );

                    }

                    return (
                        <div>
                            { "blank" }
                        </div>
                    );

                }

            }
            sensitive={ sensitive }
            strict={ strict }
        />
    );

};


export interface RouterProps{
    // This can be anything
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    initial?: string;
    // This can be anything
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loader: (id: string) => () => Promise<{ default: React.ComponentType<any> }>;
    routes: TamlandRoute[];
}


// eslint-disable-next-line react/no-multi-comp
export class Router extends React.Component<RouterProps>{

    public shouldComponentUpdate(): boolean{

        return true;

    }

    public render(): React.ReactNode{

        return (
            <Switch>
                { this.props.routes.map((instance): React.ReactNode => render(instance, this.props.loader)) }
            </Switch>
        );

    }

}
