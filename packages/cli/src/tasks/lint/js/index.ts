

import fs from "fs";
import path from "path";

import cache from "gulp-cache";
import eslint from "gulp-eslint";
import gulp from "gulp";
import gulpIf from "gulp-if";
import {
    LintError,
    LintErrorFile,
    logger
} from "@tamland/logger";
import vinyl from "vinyl";


import * as gulpUtils from "../../../utils/gulp";


const config = {
    cache: true,
    fix: true,
    warnFileIgnored: true
};

const rawPackageJSON = String(fs.readFileSync(path.join(process.cwd(), "package.json")));


// Returns true if eslint has made any automatic fixes to a file
const fixed = (file: vinyl): boolean => Boolean(
    config.fix &&
    file.eslint &&
    file.eslint.fixed
);


export interface ESLintFile extends vinyl{
    eslint: {
        fixed: boolean;
    };
}


export const lintJSTask = async function(
    paths: string[],
    watching: boolean
): Promise<void>{

    return new Promise((resolve): void => {

        gulp.src(paths)
        .pipe(gulpUtils.print("lint"))
        .pipe(watching ? eslint(config) : cache(eslint(config), {
            // Cache key based on the file contents, eslint + plugin versions and eslint options
            key: (file): string => file.contents ? `${ file.contents.toString("utf8") }${ rawPackageJSON }` : "",
            success: (file): boolean => file.eslint.errorCount === 0,
            value: (file): { eslint: ESLintFile["eslint"] } => ({ eslint: file.eslint })
        }))
        .pipe(eslint.format(
            (errorFiles): void => {

                logger.lint(errorFiles.map((errorFile): LintErrorFile => ({
                    errors: errorFile.messages.map((error): LintError => ({
                        column: error.column,
                        file: errorFile.filePath,
                        line: Number(error.line) + 1,
                        message: `${ error.message } (${ error.ruleId })`
                    })),
                    filePath: errorFile.filePath
                })));

            },
            (message: string): void => {

                gulpUtils.fail("lint", message);

            }
        ))
        .pipe(gulpIf((file): boolean => fixed(file), gulp.dest(".")))
        .pipe(gulpUtils.touch(fixed))
        .pipe(watching ? gulpUtils.skip() : eslint.failAfterError())
        .on("finish", (): void => {

            resolve();

        });

    });

};
