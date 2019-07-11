

import { Route as PageRoute } from "@tamland/core";

import { AboutRoute } from "./about";
import { CareersRoute } from "./careers";
import { ContactRoute } from "./contact";
import { CosmosRoute } from "./cosmos";
import { HomeRoute } from "./home";
import { PageNotFoundRoute } from "./pageNotFound";


export const routes: PageRoute[] = [
    new AboutRoute(),
    new CareersRoute(),
    new ContactRoute(),
    new CosmosRoute(),
    new HomeRoute(),
    new PageNotFoundRoute()
];
