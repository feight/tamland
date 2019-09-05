

import React from "react";
import { Route as PageRoute } from "@tamland/web";


export class Route extends PageRoute{

    public loading(): React.ReactNode{

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public loadable(id: string): () => Promise<{ default: React.ComponentType<any> }>{

        // eslint-disable-next-line no-inline-comments, @typescript-eslint/no-explicit-any
        return /* #__LOADABLE__ */ (): Promise<{ default: React.ComponentType<any> }> => import(

            /* webpackChunkName: "[request]" */
            `./../routes/${ id }/page`
        );

    }

}
