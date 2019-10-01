

import * as React from "react";


interface ToggleProps{
    onChange: (value: boolean) => void;
    value: boolean;
}


export class Toggle extends React.Component<ToggleProps>{

    public constructor(props: ToggleProps){

        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);

    }

    public shouldComponentUpdate(): boolean{

        return true;

    }

    public render(): React.ReactNode{

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
