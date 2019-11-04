#!/bin/bash

mksubdir() {
    rm -rf ./$1
    mkdir $1
    
    if [ ! -d $1 ];then
        rm -rf ./$1
        mkdir $1
    fi
}

format() {
    mksubdir 'format'
    pegjs --format commonjs -o format/arithmetics-commonjs.js arithmetics.pegjs
    pegjs --format umd -o format/arithmetics-umd.js arithmetics.pegjs
    pegjs --format amd -o format/arithmetics-amd.js arithmetics.pegjs
    pegjs --format globals -o format/arithmetics-globals.js arithmetics.pegjs
}

allowed_start_rules() {
    mksubdir 'allowed_start_rules'
    pegjs --allowed-start-rules Term -o allowed_start_rules/arithmetics_allowed_start_rules.js arithmetics.pegjs
    pegjs -o allowed_start_rules/arithmetics.js arithmetics.pegjs
}

format
allowed_start_rules