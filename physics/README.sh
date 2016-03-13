#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

# uglify & beautify
uglifyjs test/macro.js -b -o test/macro.js
cat License.js test/macro.js > temp.js
mv temp.js test/macro.js

uglifyjs unpacked/physics.js -b -o unpacked/physics.js
cat License.js unpacked/physics.js > temp.js
mv temp.js unpacked/physics.js

uglifyjs unpacked/physics.js -m -c -o physics.js
cat License.js physics.js > temp.js
mv temp.js physics.js

# MultiMarkdown

mmd test/macro.md
mmd README.md

cp README.md temp.md
mmd2pdf temp.md
mv temp.pdf README.pdf
find . -iname 'temp.*' -exec mv '{}' ~/.Trash/ \;