

import React from "react";

import style from "./index.module.scss";


const perks: string[] = [
    "Regular Team Building",
    "Aeron Chairs",
    "Flexible Hours",
    "Good Coffee",
    "Relaxed Working Environment",
    "Well Stocked Bar for Beer Fridays or any other days",
    "Form2 3D Printer",
    "HTC Vive VR",
    "Mario Kart",
    "Nerfguns",
    "No Dress Code",
    "Well Stocked Kitchen (Breakfast Cereals, Snacks, etc)",
    "Exciting Prospects on Up & Coming Projects"
];


export class Perks extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.perks }>

                <h2>
                    { "Perks" }
                </h2>

                <ul>

                    { perks.map((perk: string): React.ReactNode => (

                        <li key={ perk }>
                            { perk }
                        </li>

                    )) }

                </ul>

            </div>
        );

    }

}
