

import tape from "tape";
import colorJson from "color-json";

import { config } from "../lib";


console.log("Default Configuration:");
console.log("");
console.log(colorJson(config, {
    boolean: "magenta",
    key: "green",
    null: "red",
    number: "magenta",
    separator: "white",
    string: "yellow"
}));
console.log("");


tape("entry point parse", (test) => {

    test.doesNotThrow(() => require("../lib"), "index does not throw");

    test.end();

});
