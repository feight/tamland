
/*

    eslint

    @typescript-eslint/no-require-imports: "off",
    global-require: "off",
    import/max-dependencies: "off"

*/

import React from "react";

import style from "./index.module.scss";


interface CategoryItem{
    image: string;
    name: string;
}

interface Category{
    items: CategoryItem[];
    name: string;
}


const categories: Category[] = [
    {
        items: [
            {
                image: require("./images/sass.png"),
                name: "Sass"
            },
            {
                image: require("./images/javascript.png"),
                name: "Javascript"
            },
            {
                image: require("./images/typescript.png"),
                name: "Typescript"
            },
            {
                image: require("./images/webpack.png"),
                name: "Webpack"
            },
            {
                image: require("./images/eslint.png"),
                name: "ESLint"
            },
            {
                image: require("./images/nodejs.png"),
                name: "Node.js"
            },
            {
                image: require("./images/python.png"),
                name: "Python"
            },
            {
                image: require("./images/mysql.png"),
                name: "MySQL"
            },
            {
                image: require("./images/react.png"),
                name: "React"
            },
            {
                image: require("./images/memcached.png"),
                name: "Memcached"
            },
            {
                image: require("./images/jquery.png"),
                name: "jQuery"
            },
            {
                image: require("./images/html5.png"),
                name: "HTML5"
            },
            {
                image: require("./images/csharp.png"),
                name: "C#"
            },
            {
                image: require("./images/bootstrap.png"),
                name: "Bootstrap"
            },
            {
                image: require("./images/gae.png"),
                name: "Google App Engine"
            },
            {
                image: require("./images/xamarin.png"),
                name: "Xamarin"
            }
        ],
        name: "Application and Data"
    },
    {
        items: [
            {
                image: require("./images/github.png"),
                name: "Github"
            },
            {
                image: require("./images/grunt.png"),
                name: "Grunt"
            },
            {
                image: require("./images/gulp.png"),
                name: "Gulp"
            },
            {
                image: require("./images/docker.png"),
                name: "Docker"
            },
            {
                image: require("./images/npm.png"),
                name: "Npm"
            },
            {
                image: require("./images/kubernetes.png"),
                name: "Kubernetes"
            }
        ],
        name: "DevOps"
    },
    {
        items: [
            {
                image: require("./images/elasticsearch.png"),
                name: "Elasticsearch"
            }
        ],
        name: "Utilities"
    },
    {
        items: [
            {
                image: require("./images/slack.png"),
                name: "Slack"
            },
            {
                image: require("./images/trello.png"),
                name: "Trello"
            },
            {
                image: require("./images/jira.png"),
                name: "JIRA"
            }
        ],
        name: "Business Tools"
    }
];


export class Tech extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div className={ style.tech }>

                <h2>
                    { "Tech Stack" }
                </h2>

                { categories.map((category: Category): React.ReactNode => (

                    <div
                        key={ category.name }
                    >

                        <h3>
                            { category.name }
                        </h3>

                        <ul>

                            { category.items.map((item: CategoryItem): React.ReactNode => (

                                <li
                                    key={ item.name }
                                    style={ {
                                        backgroundImage: `url(${ item.image })`
                                    } }
                                >

                                    { item.name }

                                </li>

                            )) }

                        </ul>

                    </div>

                )) }

            </div>
        );

    }

}
