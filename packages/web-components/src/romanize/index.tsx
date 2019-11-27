

import * as React from "react";
import { romanize } from "@ionaru/romanize";


interface RomanizeProps{
    number: number;
}


export class Romanize extends React.Component<RomanizeProps>{

    shouldComponentUpdate(props: RomanizeProps): boolean{

        if(this.props.number !== props.number){

            return true;

        }

        return false;

    }

    render(): React.ReactNode{

        return (
            <span>
                { romanize(this.props.number) }
            </span>
        );

    }

}
