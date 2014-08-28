#!/bin/bash

# start server with forever (needs to be installed) and watch for file changes
forever start -l logs/forever.log -o logs/out.log -e logs/err.log -w -a --watchIgnore=logs/** server.js