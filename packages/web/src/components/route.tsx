

import React from "react";
import {
    RouteComponentProps,
    Route as ReactRouterDomRoute
} from "react-router-dom";
import loadable from "@loadable/component";
import {
    ThunkAction,
    ThunkDispatch
} from "redux-thunk";
import { AnyAction } from "redux";

import { PageProps } from "./page";


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

    public actions(): ThunkAction<Promise<void>, {}, {}, AnyAction>{

        return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => new Promise<void>((resolve): void => {

            const delay = 50;

            setTimeout((): void => {

                dispatch({
                    test: true,
                    type: "TEST_ACTION"
                });

                resolve();

            }, delay);
        });

    }

    public loadable(id: string, props: PageProps): (() => Promise<{ default: React.ComponentType<PageProps> }>) | undefined{

        console.log(`public loadable(id: string): () => Promise<{ default: React.ComponentType }> not implmented on Route ${ id } at ${ props.match.path }`);

        // eslint-disable-next-line no-undefined
        return undefined;

    }

    public loading(): React.ReactNode{

        return (
            <div>
                { "loading" }
            </div>
        );

    }

    public render(): React.ReactNode{

        return (
            <ReactRouterDomRoute
                exact={ this.exact }
                key={ this.path }
                path={ this.path }

                /*
                 * We're going to let this one slide for now, because we need to override
                 * the render method and I can't think of how to do this without a function
                 */
                render={ // eslint-disable-line react/jsx-no-bind

                    // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                    ({ match }): React.ReactNode => {

                        const pageProps = { match };
                        const loadableComponent = this.loadable(this.id, pageProps);

                        if(loadableComponent){

                            const Page = loadable(loadableComponent, {
                                fallback: (
                                    <div>
                                        { this.loading() }
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
                sensitive={ this.sensitive }
                strict={ this.strict }
            />
        );

    }

}
