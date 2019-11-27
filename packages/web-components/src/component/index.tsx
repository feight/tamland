

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

    readonly classes: {
        [className: string]: string;
    };

    readonly features: Features;

    constructor(props: TP){

        super(props);

        this.features = this.getFeatures();

    }

    shouldComponentUpdate(
        // This method signature is needed when extending from this class
        /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-vars-experimental */
        props: TP,
        state: TS
        /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-vars-experimental */
    ): boolean{

        return true;

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
