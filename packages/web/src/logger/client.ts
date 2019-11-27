

const noop = (): void => {};


export default {
    // This isn't a problem with console methods
    /* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition */
    debug: console?.debug ? console.debug : noop,
    error: console?.error ? console.error : noop,
    info: console?.info ? console.info : noop,
    log: console?.log ? console.log : noop,
    silly: console?.log ? console.log : noop,
    verbose: console?.log ? console.log : noop,
    warn: console?.warn ? console.warn : noop
    /* eslint-enable @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition */
};
