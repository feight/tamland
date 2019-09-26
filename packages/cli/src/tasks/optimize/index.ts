

import path from "path";

import chalk from "chalk";
import fs from "fs-extra";
import filesize from "filesize";
import globby from "globby";
import { imagemin } from "@tamland/imagemin";
import { logger } from "@tamland/logger";
import { TamlandConfig } from "@tamland/config";


const label = "optimize";


export const optimizeTask = async function(config: TamlandConfig): Promise<void>{

    const paths = await globby(config.optimize.image.paths);
    const stats = await Promise.all(paths.map((pth): Promise<fs.Stats> => fs.stat(pth)));
    const sizes = stats.map((stat): number => stat.size);

    // We're try catching into the rejection, so we'll catch any errors
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    const savings = await Promise.all(paths.map((pth, index): Promise<number> => new Promise(async (resolve, reject): Promise<void> => {

        try{

            const [file] = await imagemin([pth], path.dirname(pth));

            const percentageBase = 100;
            const diff = sizes[index] - file.data.byteLength;
            const arrow = `${ filesize(sizes[index]) } > ${ filesize(file.data.byteLength) }`;
            const percentage = chalk.hex(diff < 0 ? "#ff0000" : "#00ff00")(`${ (diff / sizes[index] * percentageBase).toFixed(1) }%`);

            logger.log(`${ percentage } ${ arrow } ${ chalk.hex("#666")(pth) }`, { label });

            resolve(diff);

        }catch(error){

            reject(error);

        }

    })));

    if(savings.length > 0){

        const saved = filesize(savings.reduce((accumulator, current): number => Number(current) + Number(accumulator)));

        logger.log(`Saved a total of ${ chalk.hex("#00ff00")(saved) }`, { label });

    }else{

        logger.log("No images found", { label });

    }

};
