

export interface ManifestConfiguration {
    backgroundColor: string;
    description: string;
    display: string;
    icons: {
        sizes: string;
        src: string;
        type: string;
    }[];
    name: string;
    orientation?: string;
    scope?: string;
    shortName: string;
    startUrl: string;
    themeColor: string;
}
