

import type ClientLogger from "./client";
import type ServerLogger from "./server";


// Needed so that webpack won't require this on the server
// eslint-disable-next-line max-len
// eslint-disable-next-line no-eval, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const logger: typeof ClientLogger | typeof ServerLogger = typeof window === "undefined" ? eval("require")("./server") : require("./client").default;


export default logger;
