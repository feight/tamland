

// Needed so that webpack won't require this on the server
// eslint-disable-next-line no-eval, global-require, @typescript-eslint/no-require-imports
export default typeof window === "undefined" ? eval("require")("./server") : require("./client").default;
