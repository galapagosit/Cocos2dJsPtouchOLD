#!/bin/sh

DIR=`dirname ${0}`

touch -cm main.js \;
touch -cm project.json \;
find $DIR/../src -exec touch -cm {} \;
find $DIR/../res -exec touch -cm {} \;

