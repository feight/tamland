

interface Icon{
    path: string;
    size: [number, number];
}

// eslint-disable-next-line max-lines-per-function, complexity
export const renderIcons = function(icons: Icon[]): string{

    const misses: string[] = [];

    const getIconPath = function(size: number | [number, number]): string | undefined{

        const [icon] = icons.filter((ico): boolean => ico.size.join("x") === (typeof size === "number" ? `${ size }x${ size }` : `${ size.join("x") }`));

        if(!icon){

            misses.push(typeof size === "number" ? `${ size }x${ size }` : `${ size.join("x") }`);

            // eslint-disable-next-line no-undefined
            return undefined;

        }

        return icon.path;

    };

    /* eslint-disable @typescript-eslint/no-magic-numbers, no-magic-numbers, more/no-numeric-endings-for-variables */
    const icon16 = getIconPath(16);
    const icon32 = getIconPath(32);
    const icon57 = getIconPath(57);
    const icon60 = getIconPath(60);
    const icon64 = getIconPath(64);
    const icon72 = getIconPath(72);
    const icon76 = getIconPath(76);
    const icon114 = getIconPath(114);
    const icon120 = getIconPath(120);
    const icon128 = getIconPath(128);
    const icon144 = getIconPath(144);
    const icon152 = getIconPath(152);
    const icon167 = getIconPath(167);
    const icon180 = getIconPath(180);
    const icon192 = getIconPath(192);
    const icon256 = getIconPath(256);
    const icon270 = getIconPath(270);
    const icon558 = getIconPath(558);
    const icon558x270 = getIconPath([558, 270]);
    /* eslint-enable @typescript-eslint/no-magic-numbers, no-magic-numbers, more/no-numeric-endings-for-variables */

    if(misses.length > 0){

        console.warn("");
        console.warn("Missing icon in tamland.config.icons");
        console.warn("");

        misses.forEach((miss: string): void => {

            console.warn(`  ${ miss }`);

        });

        console.warn("");

    }

    return [

        // Generic Sizes
        icon16 ? `<link rel="icon" type="image/png" sizes="16x16" href="${ icon16 }">` : "",
        icon32 ? `<link rel="icon" type="image/png" sizes="32x32" href="${ icon32 }">` : "",
        icon64 ? `<link rel="icon" type="image/png" sizes="64x64" href="${ icon64 }">` : "",
        icon128 ? `<link rel="icon" type="image/png" sizes="128x128" href="${ icon128 }">` : "",
        icon192 ? `<link rel="icon" type="image/png" sizes="192x192" href="${ icon192 }">` : "",
        icon256 ? `<link rel="icon" type="image/png" sizes="256x256" href="${ icon256 }">` : "",

        // IPhone 1st, 2nd, 3rd Generation on iOS <= 6
        icon57 ? `<link rel="apple-touch-icon" sizes="57x57" href="${ icon57 }">` : "",
        // IPhone 1st, 2nd, 3rd Generation on iOS 7
        icon60 ? `<link rel="apple-touch-icon" sizes="60x60" href="${ icon60 }">` : "",
        // IPad 1, 2, Mini 1 on iOS <= 6
        icon72 ? `<link rel="apple-touch-icon" sizes="72x72" href="${ icon72 }">` : "",
        // IPad 1, 2, Mini 1 on iOS 7
        icon76 ? `<link rel="apple-touch-icon" sizes="76x76" href="${ icon76 }">` : "",
        // IPhone 4, 4S, 5, 5C, 5S, 6, 6SE, 6S, 7, 8 on iOS < 6
        icon114 ? `<link rel="apple-touch-icon" sizes="114x114" href="${ icon114 }">` : "",
        // IPhone 4, 4S, 5, 5C, 5S, 6, 6SE, 6S, 7, 8 on iOS 7
        icon120 ? `<link rel="apple-touch-icon" sizes="120x120" href="${ icon120 }">` : "",
        // IPad Mini 2 & 3, Air, 3 & 4 on iOS <= 6
        icon144 ? `<link rel="apple-touch-icon" sizes="144x144" href="${ icon144 }">` : "",
        // IPad Mini 2 & 3, Air, 3 & 4 on iOS 7
        icon152 ? `<link rel="apple-touch-icon" sizes="152x152" href="${ icon152 }">` : "",
        // IPad Pro
        icon167 ? `<link rel="apple-touch-icon" sizes="167x167" href="${ icon167 }">` : "",
        // IPhone 6+, 6S+, 7+, 8+, X iOS 8
        icon180 ? `<link rel="apple-touch-icon" sizes="180x180" href="${ icon180 }">` : "",

        /*
         * Microsoft icon definitions are based on the display size, not the resolution.
         * Because of this, and in order to support tiles on higher density screens the image
         * dimension does not match the tile dimension like every other icon type.
         * for more details on this please read...
         *
         * https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn455106(v=vs.85)
         */
        icon128 ? `<meta name="msapplication-square70x70logo" content="${ icon128 }">` : "",
        icon270 ? `<meta name="msapplication-square150x150logo" content="${ icon270 }">` : "",
        icon558 ? `<meta name="msapplication-square310x310logo" content="${ icon558 }">` : "",
        icon558x270 ? `<meta name="msapplication-wide310x150logo" content="${ icon558x270 }">` : "",
        // Documentation doesn't recommend a higher resolution for this.
        icon144 ? `<meta name="msapplication-TileImage" content="${ icon144 }">` : ""

    ].join("");

};
