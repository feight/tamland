#!/usr/bin/env bash

function build_basic {
    babel src --ignore '**/*.d.ts,src/cli' --out-dir lib --extensions '.js,.jsx,.ts,.tsx'
}

function build_cli {
    babel src --ignore '**/*.d.ts,src/cli' --out-dir lib --extensions '.js,.jsx,.ts,.tsx'
}

# Clean the lib directory
rm -rf lib &&
echo 'Successfully cleaned the lib directory'

# Build all .js and .ts code into the lib directory
export BUILD_MJS=1
build_basic &&

# Make .mjs versions of the .js files in the lib directory
renamer --find js --replace mjs "lib/**" &&
echo 'Successfully generated .mjs assets'

# Make .js files in the lib directory again because the old ones are now .mjs
export BUILD_MJS=0
build_basic &&
echo 'Successfully generated .js assets'

if [ -d "./src/cli" ]; then
    export BUILD_SHEBANG=1
    babel src/cli --out-dir lib/cli --extensions '.js,.jsx,.ts,.tsx'
    echo 'Successfully generated cli assets'
fi

if [ -d "./src/static" ]; then
    rsync -rv --include '*/' --include '*.*' --exclude '*' --prune-empty-dirs src/static lib &&
    echo 'Successfully copied static assets'
fi

rsync -rv --include '*/' --include '*.scss' --exclude '*' --prune-empty-dirs src/ lib/ &&
echo 'Successfully copied scss assets'

# Generate typescript declarations
tsc --emitDeclarationOnly &&
echo 'Successfully generated .d.ts assets'

# if [ -d "./src" ]; then
#     rsync -rv --include '*/' --include '*.*' --exclude '*' --prune-empty-dirs src/types lib &&
#     echo 'Successfully copied types'
# fi

if [ -d "./src/definitions.d.ts" ]; then
    cp src/definitions.d.ts lib/definitions.d.ts &&
    echo 'Successfully copied definitions.d.ts asset'
fi
