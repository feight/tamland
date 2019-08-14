

import React from "react";
import { Page } from "@tamland/web";

import { Contact } from "./components/contact";
import { Features } from "./components/features";
import { Publications } from "./components/publications";
import { Splash } from "./components/splash";


export default class HomePage extends Page{

    public render(): React.ReactNode{

        return (
            <div>

                <Splash />

                <Publications />

                <Features />

                <Contact />

            </div>
        );

    }

}
