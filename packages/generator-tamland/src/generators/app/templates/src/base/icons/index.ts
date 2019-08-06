

/*

    eslint

    @typescript-eslint/no-magic-numbers: "off",
    import/extensions: "off",
    import/no-unresolved: "off",
    node/file-extension-in-import: "off",
    node/no-missing-import: "off",
    no-magic-numbers: "off"

*/


import icon16 from "./icon.png?{'resize':[16,16]}";
import icon32 from "./icon.png?{'resize':[32,32]}";
import icon57 from "./icon.png?{'resize':[57,57]}";
import icon60 from "./icon.png?{'resize':[60,60]}";
import icon64 from "./icon.png?{'resize':[64,64]}";
import icon72 from "./icon.png?{'resize':[72,72]}";
import icon76 from "./icon.png?{'resize':[76,76]}";
import icon114 from "./icon.png?{'resize':[114,114]}";
import icon120 from "./icon.png?{'resize':[120,120]}";
import icon128 from "./icon.png?{'resize':[128,128]}";
import icon144 from "./icon.png?{'resize':[144,144]}";
import icon270 from "./icon.png?{'resize':[270,270]}";
import icon152 from "./icon.png?{'resize':[152,152]}";
import icon167 from "./icon.png?{'resize':[167,167]}";
import icon180 from "./icon.png?{'resize':[180,180]}";
import icon192 from "./icon.png?{'resize':[192,192]}";
import icon256 from "./icon.png?{'resize':[256,256]}";
import icon558 from "./icon.png?{'resize':[558,558]}";
import icon558x270 from "./icon-wide.png?{'resize':[558,270]}";
import icon512 from "./icon.png?{'resize':[512,512]}";


const icons: {
    path: string;
    size: [number, number];
}[] = [

    // Generic size
    {
        path: icon16,
        size: [16, 16]
    },

    // Generic size
    {
        path: icon32,
        size: [32, 32]
    },

    // IPhone 1st, 2nd, 3rd Generation on iOS <= 6
    {
        path: icon57,
        size: [57, 57]
    },

    // IPhone 1st, 2nd, 3rd Generation on iOS 7
    {
        path: icon60,
        size: [60, 60]
    },

    // Generic size
    {
        path: icon64,
        size: [64, 64]
    },

    // IPad 1, 2, Mini 1 on iOS <= 6
    {
        path: icon72,
        size: [72, 72]
    },

    // IPad 1, 2, Mini 1 on iOS 7
    {
        path: icon76,
        size: [76, 76]
    },

    // IPhone 4, 4S, 5, 5C, 5S, 6, 6SE, 6S, 7, 8 on iOS < 6
    {
        path: icon114,
        size: [114, 114]
    },

    // IPhone 4, 4S, 5, 5C, 5S, 6, 6SE, 6S, 7, 8 on iOS 7
    {
        path: icon120,
        size: [120, 120]
    },

    // Generic size & Microsoft Application Square - Small
    {
        path: icon128,
        size: [128, 128]
    },

    // IPad Mini 2 & 3, Air, 3 & 4 on iOS <= 6
    {
        path: icon144,
        size: [144, 144]
    },

    // Microsoft Application Square - Medium
    {
        path: icon270,
        size: [270, 270]
    },

    // IPad Mini 2 & 3, Air, 3 & 4 on iOS 7
    {
        path: icon152,
        size: [152, 152]
    },

    // IPad Pro
    {
        path: icon167,
        size: [167, 167]
    },

    // IPhone 6+, 6S+, 7+, 8+, X iOS 8
    {
        path: icon180,
        size: [180, 180]
    },

    // Generic size
    {
        path: icon192,
        size: [192, 192]
    },

    // Generic size
    {
        path: icon256,
        size: [256, 256]
    },

    // Microsoft Application Square - Large
    {
        path: icon558,
        size: [558, 558]
    },

    // Microsoft Application Square - Wide
    {
        path: icon558x270,
        size: [558, 270]
    },

    // Generic size
    {
        path: icon512,
        size: [512, 512]
    }

];


export default icons;
