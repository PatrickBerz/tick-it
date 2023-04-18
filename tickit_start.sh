#!/bin/bash
which node
if [ $? -ne 0 ]; then
    pause 'Please install node.' 
    exit 1
fi
which xterm
if [ $? -ne 0 ]; then
    pause 'Please install xterm.'
    exit 1
fi
(
    cd ./backend
    npm install
    npm install typescript-json-serializer --save
    echo 'npm backend installed'
    xterm -hold -e "npx ts-node --esm index.ts" &
)
(
    cd ./frontend
    npm install
    npm start
    echo 'web server started'
)

