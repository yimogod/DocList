#!/bin/bash
cmd=$1
echo "---------------------------------------- run ubox cmd:" $cmd "----------------------------------------------"

if [ $cmd = "run" ]; then
    export GIN_MODE=release
    chmod +x ./bin/ubox
    ./bin/ubox
elif [ $cmd = "build" ]; then
    export GOPATH=`pwd`
    export GIN_MODE=release

    go build -o ./bin/ubox ./src
    chmod +x ./bin/ubox
    
    cp ./bin/ubox /root/product/
    chmod +x /root/product/ubox
elif [ $cmd = "runx" ]; then
    go build -o ./bin/ubox ./src
    
    export GIN_MODE=release
    chmod +x ./bin/ubox
    ./bin/ubox
elif [ $cmd = "help" ]; then
    echo "run -- run ubox"
    echo "build -- go build exe in ./bin/ubox"
    echo "runx -- build and run"
else
    echo "cmd not handled"
fi
