Coming soon… ⏳

## Intro
(create-react-app)

## Running, building

Good news: for development, you only need [Docker](https://store.docker.com/search?type=edition&offering=community) and a [code editor](https://code.visualstudio.com/)! To start the development environment:

    docker-compose up

This builds a Docker image `radix-web-dev`, runs it in the container `radix-web-dev_container`, mounts the local directory into `/app` in the container, and runs the `npm start` script, which watches for changes

**Important**: the `node_modules` directory is not mapped to the host; it is a Docker volume. NPM commands must be run in the container, even if you have NPM installed on the host. To run a command in the container:

    docker exec -ti radix-web-dev_container <command>

For instance:

    docker exec -ti radix-web-dev_container npm install --save left-pad

To get a shell:

    docker exec -ti radix-web-dev_container sh

If you need to nuke `node_modules` you can stop the container and run:

    docker container rm radix-web-dev_container
    docker volume rm radix-web-dev_node-modules

If you change `package.json` (e.g. add a dependency), you will need to rebuild the dev image:

    docker-compose up --build

## State


## Components


## CSS


## Testing


