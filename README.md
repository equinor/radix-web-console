**PROD** ![prod](https://api.radix.equinor.com/api/v1/applications/radix-web-console/environments/prod/buildstatus)  **QA** ![qa](https://api.radix.equinor.com/api/v1/applications/radix-web-console/environments/qa/buildstatus)     [![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/radix-web-console/badge)](https://developer.equinor.com/governance/scm-policy/)
# Radix Web Console

This is the web frontend for interacting with [Radix](https://www.radix.equinor.com). This document is for developers of the Web Console, or anyone interested in poking around.

Most of the build infrastructure is provided by [Create React App](https://github.com/facebook/create-react-app), so reading its User Guide is recommended.

## Windows notes

If using Windows, you need at least Windows 10 Creators Update.

There is currently [a problem](https://github.com/docker/for-win/issues/56) with Docker that prevents auto-reload of the development server from working when source files change. A simple workaround is to use [a little watcher process](https://github.com/FrodeHus/docker-windows-volume-watcher/releases).

> TODO: It looks like this has been solved with [Docker Desktop 2.1.6](https://docs.docker.com/docker-for-windows/edge-release-notes/#docker-desktop-community-2160); need to confirm and remove this note

## Running, building

### With Docker

Good news: for development, you only need [Docker](https://store.docker.com/search?type=edition&offering=community) and a [code editor](https://code.visualstudio.com/)! Start by creating your `.env` file (check the `.env.template` file for instructions). Then start the development environment:

    docker-compose up

This builds a Docker image `radix-web`, runs it in the container `radix-web_container`, mounts the local directory into `/app` in the container, and runs the `npm start` script, which watches for changes and serves the app on port 3000 (the debugger also runs on port 9222). A few other containers also start up, related to authentication. For authenticated calls to the API to work, you should access the application on [port 8000](http://localhost:8000) instead of 3000.

Stop docker-compose with Ctrl+C, but also run `docker-compose down` to clean the Docker state.

In the file [proxy/server.dev-host.conf](./proxy/server.dev-host.conf) uncomment lines with local or external URLs within `location` sections for needed local server.

**Important**: the `node_modules` directory is **not** mapped to the host (if you don't have `node_modules` locally, it will be created but it will remain empty and [it will not map](https://stackoverflow.com/questions/29181032/add-a-volume-to-docker-but-exclude-a-sub-folder) between local and container environments). NPM commands must be run in the container, even if you have NPM installed on the host. To run a command in the container:

    docker exec -ti radix-web_container <command>

For instance:

    docker exec -ti radix-web_container npm install --save left-pad

To get a shell:

    docker exec -ti radix-web_container sh

If you need to nuke `node_modules` you can stop the container and run:

    docker container rm radix-web_container
    docker volume rm radix-web_node-modules

### Without Docker

If you want to connect to local Radix-API, you can omit Docker. You may want to do this for a better experience while debugging JavaScript in your IDE (e.g. JetBrains WebStorm). Run `npm start` with `VITE_RADIX_API_BASE_URI` set to your local instance of Radix-API, e.g.

`VITE_RADIX_API_BASE_URI=127.0.0.1:3002 npm start`

Radix-API *must* run with `--useOutClusterClient=false` for this to work.

It should be possible to connect to local instances of radix-cost-allocation-api and radix-vulnerability-scanner-api in a similar fashion by setting the `VITE_COST_API_BASE_URI` and `VITE_SCAN_API_BASE_URI` environment variables, but as of August 2022, these backend applications have not been written with debug options to modify CORS settings to allow direct requests from web browser (as opposed to requests routed through the nginx proxy module in this repository).

> If you want debugging with JetBrains WebStorm to work, you may also need to set the `HOST=127.0.0.1` and `JB_IDE_HOST=127.0.0.1` environment variables. If breakpoints are not triggered in your browser, try opening your browser window by holding CTRL+Shift and clicking the link from your process console window in WebStorm.

## Deploying

The Web Console is a Radix application. Commits to `master` will trigger a build and deployment to the `qa` environment in the cluster *du jour*.

To deploy to production (`prod` environment) we must merge `master` into the `release` branch. Start by making sure you are on the correct branch:

    git checkout master
    git pull

The application's version in `package.json` must be incremented. In `master`, type one of the following:

- For small changes and fixes:

      npm version patch

- For new features that do not change URLs:

      npm version minor

- For major UI changes, or **any** URL changes:

      npm version major

Don't forget to push to `master`:

    git push --follow-tags

You can now merge `master` into `release`:

    git checkout release
    git pull
    git merge master
    git push

Radix will build and deploy the new version.

## Folder structure

The base directory is organised as defined by Create React App. Within `/src`, however:

- `/api/`: Remote API calls
- `/components/`: (Mostly) stateless UI components ([documentation](./src/components/README.md))
- `/pages/`: Page layout components for UI components
- `/effects/`: API helper effects
- `/init/`: Initialisation of the application (store, routing, etc)
- `/models/`: Domain objects, with schema ([documentation](./src/models/README.md))
- `/state/`: The application state ([documentation](./src/state/README.md))
- `/utils/`: Standalone utilities, organised by area of concern
- `/index.ts`: Entry point for the app

## Writing and running tests

Tests are written in [Jest](https://facebook.github.io/jest/). Any file within `src/` with the name `test.js` (or that ends with `.test.js`), is picked up by the test runner.

Run the tests within the Docker container:

    docker exec -ti radix-web_container npm test

You can also run the tests directly (outside Docker), but for that you need to install npm dependencies locally (i.e. `npm install --dev-only`). Then you can run locally:

    npm test

## CSS

We are using a variation of [ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528). The `/style.css` file includes all reusable styles (organised under `/style/`) and is assumed included by all components, even if being tested in isolation: `/style.css` should be treated as a global dependency. Component-specific styling should be in the CSS files of the component itself, as a local dependency.

Under `/styles/`, files are categorised in the following order:

- **settings.\*** global settings; variables only
- **generic.\*** resets; applies to most of the DOM
- **elements.\*** bare HTML elements
- **objects.\*** OOCSS-style reusable concepts: layouts, mini-layouts, animations
- **overrides.\*** utility-based styles and browser overrides

Note that the biggest section of ITCSS, "components", is not defined here. Components are defined in React and styled in their own directory. Also missing is "tools" (in ITCSS these are basically mixins, which we don't use since we don't use a preprocessor). Finally, "trumps" has been renamed "overrides", since it would otherwise hurt to see that name.

## Coding standards

Coding standards are enforced by [Biomejs](https://Biomejs.dev/) . Please use appropriate plugins for your editor:

To get ESLint to run properly from your editor you will need to have it set up in your local environment (not the dev Docker container). You can do that by running:

    npm install

You can also run linting within the Docker container:

    docker exec -ti radix-web_container npm run lint

There is also a watch mode (`npm run lint:watch`), although you already get on-the fly output from running the dev server.

Linting runs as part of the build: a linting error will prevent building.

## Production build

Besides the normal optimisations provided by Create React App, the build process runs the following checks:

- Linting, using ESLint
- Dependency license checks, using `license-checker` — configuration in `deps-license-check.js`
- Stale dependency check, using `depcheck` — configuration in `deps-stale-check.js`

The production build is containerised in the project's `Dockerfile`. To run the build image locally:

    docker build -t radix-web-prod .
    docker run --name radix-web-prod_container --rm -p 8080:80 radix-web-prod

The web server will be available on [port 8080](http://localhost:8080).

## Licensing

Check the LICENSE file.

We check dependencies' licenses using the `deps-license-check.js` script, which runs as part of the build. That file contains a list of acceptable licenses for dependencies.
