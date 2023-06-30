// Provide a reason for ignoring packages from checks!

const excludeChecksOnPackages = [
  {
    name: 'eslint-config-prettier',
    reason: 'Used by ESLint configuration',
  },
  {
    name: 'sanitize.css',
    reason: 'CSS-only dependency',
  },
  {
    name: '@babel/core',
    reason: 'Peer dependency',
  },
  {
    name: '@babel/plugin-proposal-private-property-in-object',
    reason:
      'babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore. It is thus unlikely that this bug will ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to your devDependencies to work around this error.',
  },
];

// -----------------------------------------------------------------------------

const options = { ignoreMatches: [] };

if (excludeChecksOnPackages.length) {
  console.log('Not checking these dependencies for staleness:');

  excludeChecksOnPackages.forEach((p) => {
    console.log(`- ${p.name} (${p.reason})`);
    options.ignoreMatches.push(p.name);
  });

  console.log('');
}

const depcheck = require('depcheck');
depcheck(`${__dirname}/..`, options, (unused) => {
  if (unused.dependencies.length || unused.devDependencies.length) {
    if (unused.dependencies.length) {
      console.error('Found unused dependencies', unused.dependencies);
    }

    if (unused.devDependencies.length) {
      console.error('Found unused devDependencies', unused.devDependencies);
    }

    process.exit(1);
  } else {
    console.log('No stale dependencies found');
  }
});
