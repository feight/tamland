

import React from "react";
import { Page } from "@tamland/web";
import { settings } from "@newsteam/settings";

import "./page.scss";

/*
 *Import json from "./wtf.json";
 *import {
 *   gql,
 *   Page,
 *   useQuery
 *} from "@tamland/web";
 *
 *const HelloWorld: React.FunctionComponent = () => {
 *
 *    const {
 *        data,
 *        error,
 *        loading
 *    } = useQuery(gql`
 *        {
 *            hello
 *        }
 *    `);
 *
 *    if(loading){
 *
 *        return (
 *            <p>
 *                { "Loading..." }
 *            </p>
 *        );
 *
 *    }
 *
 *    if(error){
 *
 *        return (
 *            <p>
 *                { "Error..." }
 *            </p>
 *        );
 *
 *    }
 *
 *    return (
 *        <p>
 *            { "hello" }
 *            { data.hello }
 *        </p>
 *    );
 *
 *};
 */


export default class HomePage extends Page{

    render(): React.ReactNode{

        console.log(["settings", settings]);

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
