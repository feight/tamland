

import React from "react";
import {
    gql,
    Page,
    useQuery
} from "@tamland/web";

import { Contact } from "./components/contact";
import { Features } from "./components/features";
import { Publications } from "./components/publications";
import { Splash } from "./components/splash";


const ExchangeRates: React.FunctionComponent = () => {

    const {
        data,
        error,
        loading
    } = useQuery(gql`
        {
            hello
        }
    `, {
        fetchPolicy: "network-only",
        ssr: false
    });

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


export default class HomePage extends Page{

    public render(): React.ReactNode{

        return (
            <div>

                <Splash />

                <ExchangeRates />

                <Publications />

                <Features />

                <Contact />

            </div>
        );

    }

}
