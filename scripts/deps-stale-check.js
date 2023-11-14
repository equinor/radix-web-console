// Provide a reason for ignoring packages from checks!

const excludeChecksOnPackages = [
  {
    name: 'sanitize.css',
    reason: 'CSS-only dependency',
  },
  {
    name: 'ts-node',
    reason: 'dependency of @rtk-query/codegen-openapi cli',
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
