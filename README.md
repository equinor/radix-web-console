# Radix Web Console

This is the web front-end for interacting with [Radix](https://www.radix.equinor.com). This document is for developers of the Web Console, or anyone interested in poking around.

Most of the build infrastructure is provided by [Create React App](https://github.com/facebook/create-react-app), so reading its User Guide is recommended.

## Windows notes

If using Windows, you need at least Windows 10 Creators Update.

There is currently [a problem](https://github.com/docker/for-win/issues/56) with Docker that prevents auto-reload of the development server from working when source files change. A simple workaround is to use [a little watcher process](https://github.com/FrodeHus/docker-windows-volume-watcher/releases).

## Running, building

Good news: for development, you only need [Docker](https://store.docker.com/search?type=edition&offering=community) and a [code editor](https://code.visualstudio.com/)! To start the development environment:

    docker-compose up

This builds a Docker image `radix-web-dev`, runs it in the container `radix-web-dev_container`, mounts the local directory into `/app` in the container, and runs the `npm start` script, which watches for changes and serves the app on port 3000. The debugger also runs on port 9222.

Stop the server with Ctrl+C, but also run `docker-compose down` to clean the Docker state.

**Important**: the `node_modules` directory is **not** mapped to the host (if you don't have `node_modules` locally, it will be created but it will remain empty and [it will not map](https://stackoverflow.com/questions/29181032/add-a-volume-to-docker-but-exclude-a-sub-folder) between local and container environments). NPM commands must be run in the container, even if you have NPM installed on the host. To run a command in the container:

    docker exec -ti radix-web-dev_container <command>

For instance:

    docker exec -ti radix-web-dev_container npm install --save left-pad

To get a shell:

    docker exec -ti radix-web-dev_container sh

If you need to nuke `node_modules` you can stop the container and run:

    docker container rm radix-web-dev_container
    docker volume rm radix-web-dev_node-modules

If you change `package.json` (e.g. add a dependency), or want to force a clean dev environment, you will need to rebuild the dev image:

    docker-compose up --build

## Deploying

The Web Console is a Radix application. Commits to `master` will trigger a build and deployment to the `qa` environment in the cluster _du jour_.

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

- `/init/`: Initialisation of the application (store, routing, etc)
- `/state/`: The application state ([documentation](./src/state/README.md))
- `/components/`: (Mostly) stateless UI components ([documentation](./src/components/README.md))
- `/api/`: Remote API calls
- `/models/`: Domain objects, with schema ([documentation](./src/models/README.md))
- `/utils/`: Standalone utilities, organised by area of concern
- `/index.js`: Entry point for the app

## Writing and running tests

Tests are written in [Jest](https://facebook.github.io/jest/). Any file within `src/` with the name `test.js` (or that ends with `.test.js`), is picked up by the test runner.

Run the tests within the Docker container:

    docker exec -ti radix-web-dev_container npm test

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

Coding standards are enforced by [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). Please use appropriate plugins for your editor:

- [ESLint for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [ESLint for Sublime Text](https://github.com/SublimeLinter/SublimeLinter-eslint)
- [ESLint for Atom](https://atom.io/packages/linter-eslint)
- [Prettier for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier for Sublime Text](https://github.com/danreeves/sublime-prettier)
- [Prettier for Atom](https://atom.io/packages/prettier-atom)

To get ESLint to run properly from your editor you will need to have it set up in your local environment (not the dev Docker container). You can do that by running:

    npm install --only=dev && npm install --no-save eslint

Note the "no save" `eslint` installation — this is to avoid a conflict with the version bundled with CRA, which sometimes does not work from within a code editor, without attempting to install another `eslint` version in the build.

You can also run linting within the Docker container:

    docker exec -ti radix-web-dev_container npm run lint

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

The web server will be available on http://localhost:8080

## Licensing

Check the LICENSE file.

We check dependencies' licenses using the `deps-license-check.js` script, which runs as part of the build. That file contains a list of acceptable licenses for dependencies.

