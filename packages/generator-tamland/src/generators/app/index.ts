

import Generator from "yeoman-generator";


export default class AppGenerator extends Generator{

    answers: {
        description: string;
        folder: string;
        name: string;
        project: string;
    };

    install(): void{

        this.npmInstall();

        this.spawnCommand("npm", ["install"], {
            cwd: "src/web"
        });

    }

    async prompting(): Promise<void>{

        this.answers = await this.prompt([
            {
                message: "Project name (e.g. The Tamland Blog)",
                name: "name",
                type: "input"
            },
            {
                message: "Project description (e.g. All the latest Tamland news)",
                name: "description",
                type: "input"
            },
            {
                message: "Project destination folder (e.g. tamland)",
                name: "folder",
                type: "input"
            },
            {
                message: "GAE project id (e.g. tamland-project-420)",
                name: "project",
                type: "input"
            }
        ]);

    }

    writing(): void{

        const project = String(this.answers.project)
        .replace(/\s\s+/gu, " ")
        .replace(/\s/gu, "-")
        .replace(/[^a-zA-Z0-9.-_]/gu, "-")
        .replace(/--+/gu, "-");

        this.destinationRoot(this.answers.folder);

        [
            [
                "./src",
                "./src"
            ],
            [
                "./vscode",
                "./.vscode"
            ],
            [
                "./*.*",
                "."
            ],
            [
                "./.*",
                "."
            ],
            [
                "./src/web/*.*",
                "./src/web"
            ],
            [
                "./src/web/.*",
                "./src/web"
            ]
        ].forEach((cp): void => {

            const [
                from,
                to
            ] = cp;

            this.fs.copyTpl(
                this.templatePath(from),
                this.destinationPath(to),
                {
                    project,
                    ...this.answers
                }
            );

        });

        [
            [
                "./gitignore",
                "./.gitignore"
            ]
        ].forEach((cp): void => {

            const [
                from,
                to
            ] = cp;

            this.fs.copy(
                this.templatePath(from),
                this.destinationPath(to)
            );

        });

        const packageJSON = {
            name: project,
            repository: ""
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath("package.json"), packageJSON);

    }

}
