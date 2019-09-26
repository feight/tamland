

import React from "react";
import {
    gql,
    Page,
    useQuery
} from "@tamland/web";


const HelloWorld: React.FunctionComponent = () => {

    const {
        data,
        error,
        loading
    } = useQuery(gql`
        {
            hello
        }
    `);

    if(loading){

        return (
            <p>
                { "Loading..." }
            </p>
        );

    }

    if(error){

        return (
            <p>
                { "Error..." }
            </p>
        );

    }

    return (
        <p>
            { "hello" }
            { data.hello }
        </p>
    );

};

console.log(HelloWorld);


export default class HomePage extends Page{

    public render(): React.ReactNode{

        return (
            <div>

                { "home pagexxxx" }

            </div>
        );

    }

}
