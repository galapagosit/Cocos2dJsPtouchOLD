#!/bin/sh

touch -cm main.js \;
touch -cm project.json \;
find ./src -exec touch -cm {} \;
find ./res -exec touch -cm {} \;

