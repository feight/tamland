

import config from "../config";


export default {
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

