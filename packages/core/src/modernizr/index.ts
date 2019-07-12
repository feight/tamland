
import { isServer } from "../context";

// Needed so that webpack won't require this on the client
// eslint-disable-next-line node/no-missing-require, @typescript-eslint/no-require-imports, global-require
export const Modernizr = isServer ? {} : require("modernizr");
