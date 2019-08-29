

import { id } from "./serialization";


// Needed so that webpack won't require this on the server
// eslint-disable-next-line no-eval, @typescript-eslint/no-require-imports
const module = typeof window === "undefined" ? eval("require")("./server") : require("./client").default;


export const apolloStateSerializationId = id;

export const client = module.client;
