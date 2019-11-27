

import React from "react";


export interface Match{

    /**
     * Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
     */
    params: { string?: string };

    /**
     * True if the entire URL was matched (no trailing characters)
     */
    isExact: boolean;

    /**
     * The path pattern used to match. Useful for building nested <Route>s
     */
    path: string;

    /**
     * The matched portion of the URL. Useful for building nested <Link>s
     */
    url: string;
}

export interface PageProps{

    /**
     * A match object contains information about how a <Route path> matched the URL.
     */
    match: Match;
}


export class Page extends React.PureComponent<PageProps>{

    render(): React.ReactNode{

        return (
            <div>
                { "" }
            </div>
        );

    }

}
