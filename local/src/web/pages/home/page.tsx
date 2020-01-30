

import React from "react";
import {
    gql,
    Page,
    useQuery
} from "@tamland/web";

import "./page.scss";

import json from "./wtf.json";


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
console.log(`json.poes = ${ json.poes }`);


export default class HomePage extends Page{

    render(): React.ReactNode{

        return (
            <div>

                { "home pagexxxx" }

                <div className="grid">

                    <div className="item">
                        { "1" }
                    </div>

                    <div className="item">
                        { "2" }
                    </div>

                    <div className="item">
                        { "3" }
                    </div>

                    <div className="item">
                        { "4" }
                    </div>

                    <div className="item">
                        { "5" }
                    </div>

                    <div className="item">
                        { "6" }
                    </div>

                    <div className="item">
                        { "7" }
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>

                    <div className="item">
                        { "8" }
                    </div>

                    <div className="item">
                        { "9" }
                    </div>

                    <div className="item">
                        { "10" }
                    </div>

                    <div className="item">
                        { "11" }
                    </div>

                </div>

            </div>
        );

    }

}
