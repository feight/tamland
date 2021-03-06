
interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response>|Response): Promise<Response>;
}

declare module "*.module.scss" {
    const content: {[className: string]: string};
    export default content;
}

declare module "*.scss" {
    const content: string;
    export default content;
}

declare module "*.gif" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

declare module "*.jpeg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.webp" {
    const content: string;
    export default content;
}

declare module "*.ico" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

