

import * as React from "react";


interface ToggleProps{
    onChange: (value: boolean) => void;
    value: boolean;
}


export class Toggle extends React.Component<ToggleProps>{

    constructor(props: ToggleProps){

        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);

    }

    shouldComponentUpdate(): boolean{

        return true;

    }

    render(): React.ReactNode{

        return (
            <div onClick={ this.handleOnClick }>
                { this.props.children }
            </div>
        );

    }

    private readonly handleOnClick = (): void => {

        this.props.onChange(!this.props.value);

    };

}
