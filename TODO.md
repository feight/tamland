
Finish off moving the defaults from packages/cli/src/config to packages/rc-config
Add a lang attribute to html - source the value from tamlandrc
Add a base meta description
Add start_url to the manifest
Hook up sample image icons for the manifest and link them in the html
Add a default <meta name="theme-color">
Get rid of stupid logging

figure out a way to reference things in src/shared in src/web

try out the performance of not pushing http2 pushing js code
try out performance of no script at all

fix the newsteam nav so reload doesn't flash hide it

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
Add a notification to deploy complete
Run gcloud app browse --project=newsteam-site-production after deploy
Make sure all the dot files from src/web get copied by the generator
Move host into tamlandrc web environments configuration

Integrate https://developers.google.com/web/tools/workbox/

Implemented https local testing option
    - use spdy
    - https://webapplog.com/http2-node/
    - WebpackDevServer has an https option

use connected router to get over rerender
  - finish @loadable implementation

@typescript-eslint/interface-name-prefix
    - get rid of prefer interface over type

- add jasmine tests to everything like the documentation of typescript shows

add https://github.com/gajus/prepack-webpack-plugin to webpack

add a modernizr step (finish testing it after the client webpack build is done)

add a test harness
add format message harness with https://www.npmjs.com/package/format-message
enable this for translation https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
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

make it an npm module
