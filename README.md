[![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/radix-web-console/badge)](https://developer.equinor.com/governance/scm-policy/)
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

This builds a Docker image `radix-web`, runs it in the container `radix-web_container`, mounts the local directory into `/app` in the container, and runs the `npm run dev` script, which watches for changes and serves the app on port 3000 (the debugger also runs on port 9222). A few other containers also start up, related to authentication. For authenticated calls to the API to work, you should access the application on [port 8000](http://localhost:8000) instead of 3000.

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

`npm run dev` serves the console on http://localhost:3000. Two settings choose what it talks to:

- `RADIX_API_URL`: where `/api` is proxied to (default `https://api.dev.radix.equinor.com`). The cost, log and scan APIs are always proxied to the dev cluster.
- `public/config/inject-env.js` (git-ignored): runtime config, including the login provider. Without it, the console logs in with Entra ID using the defaults in [src/utils/config/index.ts](./src/utils/config/index.ts). With the radix-local version, it logs in with the radix-local Keycloak.

The console must log in with the identity provider the API trusts, otherwise the API rejects the token (`no issuers could validate token`). Always open http://localhost:3000: if Vite falls back to another port because 3000 is taken, login fails because that redirect URL isn't allowed.

| | API | Kube context for local Radix API | `public/config/inject-env.js` | Login |
|---|---|---|---|---|
| 1 | Radix dev cluster | – | absent | Entra ID |
| 2 | Local Radix API → Radix dev cluster | dev AKS cluster | absent | Entra ID |
| 3 | Local Radix API → radix-local | `kind-radix-dev` | radix-local | Keycloak |
| 4 | Radix API inside radix-local | – | radix-local | Keycloak |

To create the radix-local config (scenarios 3 and 4):

    mkdir -p public/config
    curl -sk https://console.127-0-0-1.nip.io/config/inject-env.js \
      -o public/config/inject-env.js

To remove it again (scenarios 1 and 2):

    rm -rf public/config

A locally running Radix API calls Kubernetes with the user's token against the current context in `~/.kube/config`, so select the matching cluster (e.g. `kubectl config use-context kind-radix-dev`) before starting it. The examples below assume it listens on port 3002.

#### 1. Against the Radix dev cluster

    npm run dev

Sign in with your Equinor account.

#### 2. Against a local Radix API connected to the Radix dev cluster

    RADIX_API_URL=http://localhost:3002 npm run dev

Sign in with your Equinor account.

#### 3. Against a local Radix API connected to a [radix-local](https://github.com/equinor/radix-local) cluster

    RADIX_API_URL=http://localhost:3002 npm run dev

Sign in with a radix-local user (`./bootstrap.sh status` in radix-local lists them). Requests from tabs open on https://console.127-0-0-1.nip.io go to the in-cluster API, not your local one.

#### 4. Against the Radix API inside a [radix-local](https://github.com/equinor/radix-local) cluster

    RADIX_API_URL=https://api.127-0-0-1.nip.io \
    NODE_EXTRA_CA_CERTS=<radix-local>/.certs/pki/root-ca.crt \
    npm run dev

`NODE_EXTRA_CA_CERTS` makes the dev proxy trust the radix-local root CA. Sign in with a radix-local user.

It should be possible to connect to local instances of radix-cost-allocation-api and radix-vulnerability-scanner-api in a similar fashion by setting the `VITE_COST_API_BASE_URI` and `VITE_SCAN_API_BASE_URI` environment variables, but as of August 2022, these backend applications have not been written with debug options to modify CORS settings to allow direct requests from web browser (as opposed to requests routed through the nginx proxy module in this repository).

> If you want debugging with JetBrains WebStorm to work, you may also need to set the `HOST=127.0.0.1` and `JB_IDE_HOST=127.0.0.1` environment variables. If breakpoints are not triggered in your browser, try opening your browser window by holding CTRL+Shift and clicking the link from your process console window in WebStorm.

## Deploying

The Web Console is a Helm Package. Commits to `master` will trigger a Release PR. Merging any release PR will create a new GitHub Release and build docker containers and package an updated Helm Chart.

To deploy to production we must update [Flux CD](https://github.com/euqinor/radix-flux), a PR will be updated within minutes with the new version.

## Storybook

Components are documented and previewed with [Storybook](https://storybook.js.org/). Start by reading the **Guidelines** page in the Storybook sidebar for how stories are organized. Not all components are available through storybook.

Run it locally:

    npm run storybook

Build a static version:

    npm run build-storybook

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
- Stale dependency check, using `knip` — configuration in `package.json`

The production build is containerised in the project's `Dockerfile`. To run the build image locally:

    docker build -t radix-web-prod .
    docker run --name radix-web-prod_container --rm -p 8080:80 radix-web-prod

The web server will be available on [port 8080](http://localhost:8080).

## Licensing

Check the LICENSE file.

We check dependencies' licenses using the `deps-license-check.js` script, which runs as part of the build. That file contains a list of acceptable licenses for dependencies.
