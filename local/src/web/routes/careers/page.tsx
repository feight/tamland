

import React from "react";
import { Page } from "@tamland/web";

import style from "./page.module.scss";
import { About } from "./components/about";
import { Perks } from "./components/perks";
import { Pictures } from "./components/pictures";
import { Positions } from "./components/positions";
import { Splash } from "./components/splash";
import { Tech } from "./components/tech";


export default class CareersPage extends Page{

    public render(): React.ReactNode{

        return (
            <div className={ style.page }>

                <Splash />

                <div className={ style.content }>

                    <div className={ style.box }>

                        <Positions />

                    </div>

                    <div className={ style.box }>

                        <About />

                    </div>

                    <div className={ style.box }>

                        <Perks />

                    </div>

                    <div className={ style.box }>

                        <Tech />

                    </div>

                    <div className={ style.box }>

                        <Pictures />

                    </div>

                </div>

            </div>
        );

    }

}
