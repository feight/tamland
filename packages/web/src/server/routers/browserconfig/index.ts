

import express from "express";

import { TamlandAppConfig } from "../../../app/config";


export interface BrowserconfigConfiguration{
    icons: TamlandAppConfig["icons"];
    tileColor: TamlandAppConfig["tileColor"];
}


export const browserconfigRouter = (config: BrowserconfigConfiguration): express.Router => {

    // Force exact matches on paths
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    const {
        icons,
        tileColor
    } = config;

    const getIconPath = function(size: number | [number, number]): string{

        const [icon = undefined] = icons.filter(
            (ico): boolean => ico.size.join("x") === (typeof size === "number" ? `${ size }x${ size }` : `${ size.join("x") }`)
        );

        return icon ? icon.path : "";

    };

    /* eslint-disable no-magic-numbers, more/no-numeric-endings-for-variables */
    const icon128 = getIconPath(128);
    const icon144 = getIconPath(144);
    const icon270 = getIconPath(270);
    const icon558 = getIconPath(558);
    const icon558x270 = getIconPath([558, 270]);
    /* eslint-enable no-magic-numbers, more/no-numeric-endings-for-variables */

    router.get("/browserconfig.xml", (request, response): void => {

        response.setHeader("Content-Type", "application/xml");

        response
        .send(`
            <?xml version="1.0" encoding="utf-8"?>
            <browserconfig>
                <msapplication>
                    <tile>
                        <square70x70logo src="${ icon128 }"/>
                        <square150x150logo src="${ icon270 }"/>
                        <square310x310logo src="${ icon558 }"/>
                        <wide310x150logo src="${ icon558x270 }"/>
                        <TileImage src="${ icon144 }"/>
                        <TileColor>${ tileColor }</TileColor>
                    </tile>
                </msapplication>
            </browserconfig>
        `.trim())
        .end();

    });

    return router;

};
