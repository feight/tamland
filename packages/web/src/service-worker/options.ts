

export interface TamlandServiceWorkerOptionsInterface{

    /**
     * Optional.
     *
     * The assets you would like the service worker to precache
     *
     */
    precache: (string|{
        url: string;
        revision: string;
    })[];

}
