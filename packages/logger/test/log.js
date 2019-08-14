

import logger from "../lib";


// This breaks if you import it for some reason
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const pty = require("node-pty");


const run = function(options = {}){

    const {
        cwd = process.cwd(),
        command,
        environment = process.env,
        filter = [],
        detatch = false,
        label = "anonymous"
    } = options;

    return new Promise((resolve, reject) => {

        let cmd = Array.isArray(command) ? command.join(" ") : command;

        cmd = cmd
        .replace(/\r\n|\r|\n/gu, "")
        .replace(/\s\s+/gu, " ")
        .replace(/^\s/gu, "");

        const bashCmd = cmd;

        if(!detatch){
            logger.command(label, bashCmd);
        }

        const [cm, ...args] = bashCmd.split(" ");

        const term = pty.spawn(cm, args, {
            cols: 500,
            cwd,
            env: environment
        });

        process.stdin.pipe(term);

        const response = [];

        let startLogging = false;

        term.on("data", (data) => {

            if(data.includes("Performing post processing steps.")){
                startLogging = true;
            }

            if(startLogging){
                console.log("\n");
                console.log(["---", JSON.stringify(data)]);
                console.log("\n");
            }

            response.push(data);

            let formatted = data;

            (Array.isArray(filter) ? filter : [filter]).forEach((filt) => {
                formatted = formatted.replace(filt, "");
            });

            if(!detatch){
                logger.write(formatted, { label });
            }

        });

        term.on("exit", (code) => {

            if(code === 1){
                reject(code);
            }else{
                resolve(response.join(""));
            }

        });

    });

};


(async () => {

    try{

        await run({
            command: "ls -al",
            label: "tamland"
        });

    }catch(error){

        console.log(error);

    }

    // This is fine - it's just a test
    // eslint-disable-next-line no-process-exit
    process.exit();

})();
