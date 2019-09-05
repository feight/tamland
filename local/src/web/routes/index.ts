

import { Route as PageRoute } from "@tamland/web";

import { AboutRoute } from "./about/route";
import { CareersRoute } from "./careers/route";
import { ContactRoute } from "./contact/route";
import { CosmosRoute } from "./cosmos/route";
import { HomeRoute } from "./home/route";
import { PageNotFoundRoute } from "./pageNotFound/route";


export const routes: PageRoute[] = [
    new AboutRoute(),
    new CareersRoute(),
    new ContactRoute(),
    new CosmosRoute(),
    new HomeRoute(),
    new PageNotFoundRoute()
];
