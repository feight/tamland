

import * as React from "react";
import PropTypes from "prop-types";
import {
    Helmet,
    HelmetProvider
} from "react-helmet-async";
import { History } from "history";
import { Store } from "redux";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";


export class Tamland extends React.PureComponent<{
    helmetContext?: {} | undefined;
    history: History;
    store: Store;
}>{

    public static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired
    };

    public render(): JSX.Element{

        return (
            <Provider store={ this.props.store }>
                <HelmetProvider context={ this.props.helmetContext }>
                    <Helmet>
                        <title>
                            {

                                /*
                                 * This needs to be an empty space so that if a
                                 * Route doesn't implement a title the title is
                                 * blanked out
                                 */
                            }
                            { " " }
                        </title>
                    </Helmet>
                    <Router history={ this.props.history }>
                        { this.props.children }
                    </Router>
                </HelmetProvider>
            </Provider>
        );

    }

}

