

import React from "react";
import { Route as PageRoute } from "@tamland/web";


export class Route extends PageRoute{

    public loading(): JSX.Element{

        return (
            <div>
                { "loading..." }
            </div>
        );

    }

    /*
     * DO NOT MODIFY
     *
     * This method is used to marshal the routes page as a loadable component so
     * that client code splitting works seamlessly with server rendering. It has
     * to exist in the project context because webpack dynamic imports don't work
     * when they're made in modules inside node_modules. It's not a good idea to
     * modify this.
     */
    public loadable(id: string): () => Promise<{ default: React.ComponentType }>{

        // eslint-disable-next-line no-inline-comments
        return /* #__LOADABLE__ */ (): Promise<{ default: React.ComponentType }> => import(

            /* webpackChunkName: "[request]" */
            `./../routes/${ id }/page`
        );

    }

}
