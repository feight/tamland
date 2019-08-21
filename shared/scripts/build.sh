#!/usr/bin/env bash

# Clean the lib directory
rm -rf lib &&
echo 'Successfully cleaned the lib directory'

# Build all .js and .ts code into the lib directory
export BUILD_MJS=1
babel src --ignore '**/*.d.ts' --out-dir lib --extensions '.js,.jsx,.ts,.tsx' &&

# Make .mjs versions of the .js files in the lib directory
renamer --find js --replace mjs "lib/**" &&
echo 'Successfully generated .mjs files'

export BUILD_MJS=0
babel src --ignore '**/*.d.ts' --out-dir lib --extensions '.js,.jsx,.ts,.tsx' &&

# Generate typescript declarations
tsc --emitDeclarationOnly
echo 'Successfully generated typescript declarations'
