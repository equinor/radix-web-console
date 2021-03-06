# Configuration

## Overview

The configuration has three levels and will be loaded in this sequence:

- Configuration in file `src/config.json`
- `<body>` attribute overrides that comes from env variables in production
build. `public/index.html`
- Via URL Search Parameters when you browse the web console.

One important aspect is to know that configuration values are only set if the
provided value is defined, if not it will simply keep the old value.

### Configuration File

Example `src/config.json` extract:

    "clusterBase": "radix.equinor.com",
    "clusterEnvironment": "dev",
    "clusterName": "playground-master-45"

### Body Attributes

These are set via the `run_nginx.sh` in production runs. There are templates that
will be replaced with environment variables.

Example `public/index.html` pre production run:

    <body data-radix-cluster-name="${RADIX_CLUSTERNAME}" data-radix-environment="${RADIX_ENVIRONMENT}">

Becomes:

    <body data-radix-cluster-name="playground-master-45" data-radix-environment="dev">

Note that on some systems these names are case-sensitive.

### URL Search Parameters

URL parameter values **must** be valid JSON, e.g. `"qa"` instead of `qa`.

Supported URL Search Parameters:

- radixClusterName
- radixClusterBase
- radixClusterType
- radixEnvironment
- flags

Example:

    https://website.com/route?radixApiEnvironment="dev"&radixClusterName="release-1"&radixClusterBase="cluster.radix.equinor.com"

To remove the config set via URL; simply clear the search parameters and then
request the page again.

## Code

### Location

The entry point for the configuration with the application specific values is
located in `/src/utils/config/index.js`. This is the file you import to read the
configuration.

If you want to change the way it works, you can open it and check out the
supporting handlers, that handle the different methods of setting the
configuration.

### Using

To use the configuration, you can use it like so:

    import configHandler from 'utils/config';
    const domain = configHandler.getDomain();

### Handlers

Currently there are three handlers:

- `BodyHandler` loading from BODY tag in HTML.
- `ObjectHandler` loading from Object in code, like from a JSON file.
- `URLSearchParamsHandler` loading config from URL.
