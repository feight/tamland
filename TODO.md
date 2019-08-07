

Integrate https://developers.google.com/web/tools/workbox/

add cache-control immutatble
add image importance attribute to all images add loading=lazy to all iframes and images
guetzli and zopfli for images
add <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width">

Make a base scss in core
Add a base meta description
Hook up sample image icons for the manifest and link them in the html
Add a default <meta name="theme-color">

convert all modules to typescript

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
    Move host into tamlandrc web environments configuration

enable brotli compression https://medium.com/groww-engineering/enable-brotli-compression-in-webpack-with-fallback-to-gzip-397a57cf9fc6

Implemented https local testing option
    - use spdy
    - https://webapplog.com/http2-node/
    - WebpackDevServer has an https option

- add jasmine tests to everything like the documentation of typescript shows

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
