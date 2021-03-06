

import config from "../config";


export default {
    router: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import(id: string): () => Promise<{ default: React.ComponentType<any> }>{

            // eslint-disable-next-line no-inline-comments, @typescript-eslint/no-explicit-any
            return /* #__LOADABLE__ */ (): Promise<{ default: React.ComponentType<any> }> => import(

                /* webpackChunkName: "[request]" */
                `./pages/${ id }/page`
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
        ]
    },
    ...config
};

