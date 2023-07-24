#!/usr/bin/env bash

set -e

drop() {
    sudo --preserve-env --set-home -u node "$@"
}

# Change the uid of the node user if different to baked in
if [ "$(id -u node)" != "$PUID" ]; then
    echo "Changing app dir owner..."
    usermod -o -u "$PUID" node
    groupmod -o -g "$PUID" node
    chown -R node:node /usr/src/app
fi

echo "Starting app..."
drop npm run-script serve-docker
