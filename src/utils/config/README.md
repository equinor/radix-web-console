# Overview

The configuration has three levels and will be loaded in this sequence:
- Configuration in file `src/config.json`
- `<body>` attribute overrides that comes from env variables in production
build. `public/index.html`
- Via URL Search Paramters when you browse the web console.

One important aspect is to know that configuration values are only set if the
provided value is defined, if not it will simply keep the old value.

## Configuration File

Example `src/config.json` extract:

    "clusterBase": "radix.equinor.com",
    "clusterEnvironment": "dev",
    "clusterName": "playground-master-45"

## Body Attributes
These are set via the `run_nginx.sh` in production runs. There are templates that
will be replaced with environment variables.

Example `public/index.html` pre production run:

    <body data-radix-cluster-name="${radix_clustername}" data-radix-environment-name="${radix_environment}">

Becomes:

    <body data-radix-cluster-name="playground-master-45" data-radix-environment-name="dev">

## URL Search Parameters
Supported URL Search Parameters:
- radix_cluster
- radix_domain
- radix_env

Example:

    https://website.com/route?radix_env=dev&radix_cluster=release-1&radix_domain=cluster.radix.equinor.com

# Code

## Location
The entry point for the configuration with the application specific values is
located in `/src/utils/config/index.js`. This is the file you import to read the
configuration.

If you want to change the way it works, you can open it and check out the
supporting handlers, that handle the different methods of setting the
configuration.

## Using
To use the configuration, you can use it like so:

    import configHandler from 'utils/config';
    const domain = configHandler.getDomain();

## Handlers
Currently there are three handlers:
- `BodyHandler` loading from BODY tag in HTML.
- `ObjectHandler` loading from Object in code, like from a JSON file.
- `URLSearchParamsHandler` loading config from URL.
