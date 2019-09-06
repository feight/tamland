

import React from "react";

import style from "./index.module.scss";
import google from "./images/google.svg";
import paywal from "./images/paywall.svg";
import warehouse from "./images/warehouse.svg";
import workflow from "./images/workflow.png";
import editor from "./images/editor.png";


const features: {
    heading: string;
    image: string;
    subline: string;
    text: string;
}[] = [
    {
        heading: "Seamless Inline Editor",
        image: editor,
        subline: "When writing is this easy, journalists are free to focus on the story",
        text: `
            Our editor features an inline editing system. Editing takes place inside of the live site design, eliminating
            the need for tedious checks and confusing abstractions. Widgets are dragged, dropped and edited in seconds.
            A focus on easy of use means that new users are productive with minimal training time.
        `
    },
    {
        heading: "Hosted In The Cloud",
        image: google,
        subline: "Your team can rest easy with infrastructure that will stand up to any load",
        text: `
            Our tools are tightly coupled to the Google Cloud Platform. This hosting model is perfect for the news business.
            Costs are linked to usage so it's very cheap to start. Infrastructure is scaled up automaticly so you don't need to hire a team
            of to manage your growth. Local developer environments are free. Deployment are incredibly simple and don't have any downtime.
            Any new publication can expect to start out spending $100 per month on hosting.
        `
    },
    {
        heading: "Customizable Publishing Workflow",
        image: workflow,
        subline: "Whatever your internal processes, our workflow can adapt to fit it",
        text: `
            Our customisable workflow facilitates collaboration within large organisations around copy creation and process.
            We cater for multiple use cases already, handling things like subbing, print integrations and more.
            Whatever your organizations needs, we can make a customized workflow for you.
        `
    },
    {
        heading: "Flexible Data Warehouse",
        image: warehouse,
        subline: "Integrate third party content and share your stories across multiple publications",
        text: `
            We provide a content wire in the workflow that provides content from any integrated third parties.
            Our tools can map any external data source into the data warehouse.  One click import brings that content into your system
            where it can be enriched before publishing.
        `
    },
    {
        heading: "Paywall Support",
        image: paywal,
        subline: "Monetize your content with our integrated paywall Support",
        text: `
            Our tools have been built with premium content in mind. You can configure different content types
            that can all implement access rules and requirements (Free Users, Registrations, Premium Packages etc).
            The paywall system has been developed with the ability to create custom paywall integration plugins.
            No matter what subscription software you might already be running, we can write a plugin to integrate with it.
        `
    }
];


export class Features extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.features }>
                { features.map((feature, index): React.ReactNode => (
                    <div
                        className={ [index % 2 ? style.featureEven : style.featureOdd, style.feature].join(" ") }
                        key={ feature.heading }
                    >
                        <div className={ style.featureWrap }>
                            <div className={ style.featureImage }>
                                <img
                                    alt={ feature.heading }
                                    src={ feature.image }
                                />
                            </div>
                            <div className={ style.featureCopy }>
                                <h2>
                                    { feature.heading }
                                </h2>
                                <h3>
                                    { feature.subline }
                                </h3>
                                <p>
                                    { feature.text }
                                </p>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        );

    }

}
