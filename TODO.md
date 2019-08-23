
Add a base meta description
Hook up sample image icons for the manifest and link them in the html

generator things:
    Update the packages/generator-tamland/src/generators/app/templates/README.md
        - include all the details on how to use
            - local development
                - npm run setup
                - npm run local
                - npm run production
            - deploying
                - configuring your environments
                - npm run deploy
    Automate gcloud project and GAE project init
    Automate github init
        - pass the repo to the template generator so the package.json has the repo in it
    Make sure all the dot files from src/web get copied by the generator

add format message harness with https://www.npmjs.com/package/format-message
add a step to the build that extracts format message strings for translation

after implementing graphql have a look at https://www.npmjs.com/package/eslint-plugin-graphql

create the application
    - use react native for the --platform=mobile
    - use electron for the --platform=desktop
    - use google firestore
    - use graphql
    - use react suspence/lazy
    - use react-intl
    - use extract-react-intl
