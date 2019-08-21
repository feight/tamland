#!/usr/bin/env bash

# Clean the lib directory
rm -rf lib &&
echo 'Successfully cleaned the lib directory'

# Build all .js and .ts code into the lib directory
export BUILD_MJS=1
babel src --ignore '**/*.d.ts' --out-dir lib --extensions '.js,.jsx,.ts,.tsx' &&

# Make .mjs versions of the .js files in the lib directory
renamer --find js --replace mjs "lib/**" &&
echo 'Successfully generated .mjs assets'

export BUILD_MJS=0
babel src --ignore '**/*.d.ts' --out-dir lib --extensions '.js,.jsx,.ts,.tsx' &&
echo 'Successfully generated .js assets'

if [ -d "./src/static" ]; then
    rsync -rv --include '*/' --include '*.*' --exclude '*' --prune-empty-dirs src/static lib/static
    echo 'Successfully copied static assets'
fi

rsync -rv --include '*/' --include '*.scss' --exclude '*' --prune-empty-dirs src/ lib/
echo 'Successfully copied scss assets'

# Generate typescript declarations
tsc --emitDeclarationOnly  &&
echo 'Successfully generated .d.ts assets'

if [ -d "./src/definitions.d.ts" ]; then
    cp src/definitions.d.ts lib/definitions.d.ts
    echo 'Successfully copied definitions.d.ts asset'
fi
