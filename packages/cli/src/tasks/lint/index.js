

import css from "./css";
import js from "./js";


const lint = async function(config, options = {}){

    const watch = options.watch || false;

    await Promise.all([
        css(config.lint.css, watch),
        js(config.lint.js, watch)
    ]);

};

export default lint;
