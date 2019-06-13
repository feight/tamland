

import Generator from "yeoman-generator";


class AppGenerator extends Generator{

    install(){

        this.npmInstall();

        this.spawnCommand("npm", ["install"], {
            cwd: "src/web"
        });

    }

    async prompting(){

        this.answers = await this.prompt([
            {
                message: "Your project name",
                name: "project",
                type: "input"
            }
        ]);

    }

    writing(){

        const project = String(this.answers.project)
        .toLowerCase()
        .replace(/\s\s+/gu, " ")
        .replace(/[^a-zA-Z0-9]/gu, "-")
        .replace(/--+/gu, "-");

        this.destinationRoot(project);

        const params = {
            project
        };

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
            ]
        ].forEach((cp) => {

            const [
                from,
                to
            ] = cp;

            this.fs.copyTpl(
                this.templatePath(from),
                this.destinationPath(to),
                params
            );

        });

        const packageJSON = {
            name: params.project
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath("package.json"), packageJSON);

    }

}


export default AppGenerator;
