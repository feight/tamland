

import React from "react";
import {
    RouteComponentProps,
    Route as ReactRouterDomRoute
} from "react-router-dom";
import loadable from "@loadable/component";

import { ScrollTop } from "./scroll-top";


export interface RouteComponentProperties<T> extends RouteComponentProps{
    data?: T;
    getData: () => Promise<T>;
}


export class Route{

    public exact: boolean = true;

    public id: string;

    public path: string;

    public sensitive: boolean = true;

    public strict: boolean = true;

    public getData(): Promise<object>{

        return new Promise((resolve): void => {

            resolve({});

        });

    }

    public loadable(id: string): (() => Promise<{ default: React.ComponentType }>) | undefined{

        console.log(`public loadable(id: string): () => Promise<{ default: React.ComponentType }> not implmented on Route ${ id }`);

        // eslint-disable-next-line no-undefined
        return undefined;

    }

    public loading(): JSX.Element{

        return (
            <div>
                { "loading" }
            </div>
        );

    }

    public render(): JSX.Element{

        return (
            <ReactRouterDomRoute
                exact={ this.exact }
                key={ this.path }
                path={ this.path }

                /*
                 * We're going to let this one slide for now, because we need to override
                 * the render method and I can't think of how to do this without a function
                 */
                // eslint-disable-next-line react/jsx-no-bind, react-perf/jsx-no-new-function-as-prop
                render={ (): JSX.Element => {

                    const loadableComponent = this.loadable(this.id);

                    if(loadableComponent){

                        const Page = loadable(loadableComponent, {
                            fallback: (
                                <ScrollTop>
                                    { this.loading() }
                                </ScrollTop>
                            ),
                            ssr: true
                        });

                        return (
                            <ScrollTop>
                                <Page />
                            </ScrollTop>
                        );

                    }

                    return (
                        <div>
                            { "blank" }
                        </div>
                    );

                } }
                sensitive={ this.sensitive }
                strict={ this.strict }
            />
        );

    }

}
