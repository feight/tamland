

import { Page } from "@tamland/web";

import config from "../config";


export default {
    loader(id: string): () => Promise<{ default: React.ComponentType<Page> }>{

        // eslint-disable-next-line no-inline-comments
        return /* #__LOADABLE__ */ (): Promise<{ default: React.ComponentType<Page> }> => import(

            /* webpackChunkName: "[request]" */
            `./routes/${ id }/page`
        );

    },
    routes: [
        {
            id: "home",
            path: "/"
        },
        {
            id: "pageNotFound",
            path: "*"
        }
    ],
    ...config
};

