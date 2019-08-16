

import fs from "fs";

import gulp from "gulp";
import gulpIf from "gulp-if";
import stylelint from "gulp-stylelint";
import touch from "touch";
import {
    LintError,
    LintErrorFile,
    logger
} from "@tamland/logger";

import * as gulpUtils from "../../../utils/gulp";


export const lintCSSTask = async function(
    paths: string[],
    watching: boolean
): Promise<void>{

    const autofixed: string[] = [];

    return new Promise((resolve): void => {

        gulp.src(paths)
        .pipe(gulpUtils.print("lint"))
        .pipe(stylelint({
            failAfterError: !watching,
            fix: true,
            reporters: [
                {
                    formatter: (errorFiles): void => {

                        logger.lint(errorFiles.map((errorFile): LintErrorFile => ({
                            errors: errorFile.warnings.map((error): LintError => ({
                                column: error.column,
                                file: errorFile.source,
                                line: Number(error.line) + 1,
                                message: error.text
                            })),
                            filePath: errorFile.source
                        })));

                    }
                }
            ]
        }))
        .pipe(gulpIf((file): boolean => {

            const [p] = file.history;
            const original = fs.readFileSync(p).toString();
            // Accessing a property of a Vinyl file, don't have a choice
            // eslint-disable-next-line no-underscore-dangle
            const processed = file._contents.toString();

            const fixed = original !== processed;

            let isJSON = null;

            if(fixed){

                try{

                    JSON.parse(processed);

                    isJSON = true;

                }catch(error){

                    isJSON = false;

                }

                if(!isJSON){
                    autofixed.push(p);
                }

            }

            // Only override the file if it's been changed and isn't JSON, it's JSON when there is an error
            return isJSON ? false : fixed;

        }, gulp.dest(".")))
        .on("finish", (): void => {

            // Touch anything that got autofixed so your editor knows about it
            autofixed.forEach((file): void => touch.sync(file, {
                force: true,
                nocreate: true
            }));

            resolve();

        });

    });

};
