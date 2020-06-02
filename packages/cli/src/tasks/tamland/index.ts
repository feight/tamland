

/*

    eslint

    @typescript-eslint/no-unsafe-assignment: "off",
    @typescript-eslint/no-unsafe-member-access: "off",

*/

import path from "path";

import fs from "fs-extra";
import { hashElement } from "folder-hash";
import { logger } from "@tamland/logger";
import sequential from "promise-sequential";
import { TamlandConfig } from "@tamland/config";

import {
    exec,
    spawn
} from "../../utils/subprocess";


interface Cache{
    [id: string]: {
        package: string;
        source: string;
    } | undefined;
}


const scope = "@tamland";
const label = "tamland";


const getPackageMap = async function(targets: string[]): Promise<[string, string][]>{

    const cwd = process.cwd();
    const targetDirectories = targets.map((target): string => path.join(cwd, "src", target));
    const directories = [path.join(cwd)].concat(targetDirectories);

    const map = await Promise.all(directories.map(async (directory): Promise<{
        directory: string;
        packages: string[];
    }> => {

        const exists = await fs.pathExists(path.join(directory, "node_modules", scope));

        let packages: string[] = [];

        if(exists){
            packages = await fs.readdir(path.join(directory, "node_modules", scope));
        }

        return {
            directory,
            packages
        };

    }));

    const packageMap: [string, string][] = [];

    map.forEach((mapping): void => {
        mapping.packages.forEach((pack): void => {
            packageMap.push([mapping.directory, pack]);
        });
    });

    return packageMap;

};


const getCache = async function(): Promise<Cache>{

    const directory = path.join(process.cwd(), "node_modules/.cache");
    const filename = path.join(directory, "local-tamland.json");
    const exists = await fs.pathExists(filename);

    let cache: Cache = {};

    if(exists){

        const raw = await fs.readFile(filename, "utf-8");

        try{

            cache = JSON.parse(raw) as Cache;

        }catch(error){}

    }

    return cache;

};

const setCache = async function(cache: Cache): Promise<void>{

    const directory = path.join(process.cwd(), "node_modules/.cache");
    const filename = path.join(directory, "local-tamland.json");

    await fs.ensureDir(directory);
    await fs.writeFile(filename, JSON.stringify(cache));

};


const npmInstallPackage = async function(config: {
    cacheDirectory: string;
    installDirectory: string;
    installedDevelopment: boolean;
    location: string;
    pack: string;
}): Promise<void>{

    const {
        cacheDirectory,
        installDirectory,
        installedDevelopment,
        location,
        pack
    } = config;

    logger.log("", { label });
    logger.log(`Installing ${ scope }/${ pack } into ${ location }`, {
        color: "#00ff00",
        label
    });
    logger.log("", { label });

    await spawn({
        command: "npm run prepublishOnly",
        cwd: installDirectory,
        label
    });

    const npmPack = await exec({
        command: `cd ${ installDirectory } && npm pack`,
        label
    });

    await spawn({
        command: `mv ${ path.join(installDirectory, npmPack.replace(/\n/gu, "")) } ${ cacheDirectory }`,
        label
    });

    await spawn({
        command: `npm install ${ cacheDirectory }/${ npmPack } ${ installedDevelopment ? "--save-dev" : "" }`,
        cwd: location,
        label
    });

};


const installPackage = async function(pack: string, location: string, directory: string): Promise<void>{

    const installDirectory = path.join(directory, "packages", pack);
    const cacheDirectory = path.join(process.cwd(), "node_modules/.cache");
    const locationPackageJSONRaw = fs.readFileSync(path.join(location, "package.json")).toString();
    const locationPackageJSON = JSON.parse(locationPackageJSONRaw);
    const packageJSONRaw = fs.readFileSync(path.join(installDirectory, "package.json")).toString();
    const packageJSON = JSON.parse(packageJSONRaw);
    const cacheKey = `${ pack }-${ location }`;
    const cache = await getCache();
    const installedDevelopment = Boolean((locationPackageJSON.devDependencies || {})[`${ scope }/${ pack }`]);
    const installed = Boolean((locationPackageJSON.dependencies || {})[`${ scope }/${ pack }`]);

    await fs.ensureDir(cacheDirectory);

    const sourceCodeHash = await hashElement(installDirectory, {
        files: { include: ["*.*"] },
        folders: { exclude: ["node_modules", "packages", ".git"] }
    });

    const packageJSONHash = await hashElement(installDirectory, {
        files: { include: ["package.json"] },
        folders: { exclude: ["*"] }
    });

    const hash = {
        package: packageJSONHash.children[0].hash,
        source: sourceCodeHash.hash
    };

    const cacheHash = cache[cacheKey] ?? {
        package: "",
        source: ""
    };

    if(
        cacheHash.package === hash.package &&
        cacheHash.source === hash.source
    ){

        logger.log(`Already installed ${ pack }`, {
            color: "#aaccaa",
            label
        });

    }else if(
        cacheHash.package !== hash.package &&
        (installed || installedDevelopment)
    ){

        await npmInstallPackage({
            cacheDirectory,
            installDirectory,
            installedDevelopment,
            location,
            pack
        });

        cache[cacheKey] = hash;

    }else if(
        cacheHash.source !== hash.source &&
        (packageJSON.scripts || {}).build
    ){

        logger.log("", { label });
        logger.log(`Updating ${ scope }/${ pack } code`, {
            color: "#00ff00",
            label
        });
        logger.log("", { label });

        await spawn({
            command: "npm run build",
            cwd: installDirectory,
            label
        });

        await spawn({
            command: `cp -rf ${ installDirectory }/lib ${ path.join(location, "node_modules/@tamland", pack) }`,
            label
        });

        cache[cacheKey] = hash;

    }

    await setCache(cache);

};


export const tamlandTask = async function(config: TamlandConfig): Promise<void>{

    const tamlandConfig = config.tamland;

    if(tamlandConfig?.path){

        const packageMap = await getPackageMap(config.targets);
        const tamlandDirectory = path.normalize(path.join(process.cwd(), tamlandConfig.path));

        await sequential(packageMap.map((pack): () => Promise<void> => (): Promise<void> => installPackage(pack[1], pack[0], tamlandDirectory)));

    }

};
