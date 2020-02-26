

// This is by design. If console doesn't exist defaults to a blank function
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};


export default {
    // This isn't a problem with console methods
    /* eslint-disable @typescript-eslint/no-unnecessary-condition */
    debug: console?.debug || noop,
    error: console?.error || noop,
    info: console?.info || noop,
    log: console?.log || noop,
    silly: console?.log || noop,
    verbose: console?.log || noop,
    warn: console?.warn || noop
    /* eslint-enable @typescript-eslint/no-unnecessary-condition */
};
