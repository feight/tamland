

const noop = (): void => {};


export default {
    // This isn't a problem with console methods
    /* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition */
    debug: console && console.debug ? console.debug : noop,
    error: console && console.error ? console.error : noop,
    info: console && console.info ? console.info : noop,
    log: console && console.log ? console.log : noop,
    silly: console && console.log ? console.log : noop,
    verbose: console && console.log ? console.log : noop,
    warn: console && console.warn ? console.warn : noop
    /* eslint-enable @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition */
};
