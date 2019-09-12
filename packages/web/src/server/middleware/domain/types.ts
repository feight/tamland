

export interface DomainConfiguration{


    /**
     * Required.
     *
     * The hostname the application will be served from. If configured, in production,
     * the application will redirect to this host automatically if it is served
     * from another host. This prevents the application from serving from the appspot.com
     * domain.
     *
     * e.g. www.yourdomain.com
     */
    hostname?: string;

    /**
     * Optional.
     *
     * Is this application running on a local development server.
     *
     */
    local?: boolean;

}
