#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Run the build
bash "$DIR/build.sh" &&

# Lint the code
eslint src --ext .jsx,.js,.tsx,.ts --ignore-pattern *.d.ts &&

# Run the jasmine tests
jasmine --config=jasmine.json