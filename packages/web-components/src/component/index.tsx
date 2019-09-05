

import * as React from "react";


interface Features{
    passiveEventListeners: boolean;
}

export interface ComponentProps{
    classes: {
        [className: string]: string;
    };
}

export class Component<TP extends ComponentProps, TS> extends React.Component<TP, TS>{

    public readonly classes: {
        [className: string]: string;
    };

    public readonly features: Features;

    public constructor(props: TP){

        super(props);

        this.features = this.getFeatures();

    }

    private getFeatures(): Features{

        return {
            passiveEventListeners: ((): boolean => {

                let supports = false;

                try{

                    const options = Object.defineProperty({}, "passive", {
                        get(): boolean{

                            supports = true;

                            return supports;

                        }
                    });

                    window.addEventListener("testPassive", (): boolean => true, options);
                    window.removeEventListener("testPassive", (): boolean => true, options);

                }catch(error){}

                return supports;

            })()
        };

    }

}
