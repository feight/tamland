

import { IHelmetContentSecurityPolicyConfiguration } from "helmet";


export interface SecurityConfiguration{

    /**
     * Optional.
     *
     * Helmet content security policy
     */
    csp?: IHelmetContentSecurityPolicyConfiguration;

    /**
     * Optional.
     *
     * Sets the X-Powered-By http response header
     */
    xPoweredBy?: string;
}
