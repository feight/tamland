
declare module "*.module.scss" {
    const content: {[className: string]: string};
    export default content;
}

declare module "*.module.scss" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}
