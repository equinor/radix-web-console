// A list of licenses permitted as dependencies

var permittedLicenses = [
  'Apache',
  'BSD',
  'CC',
  'ISC',
  'MIT',
  'MPL',
  'Public Domain',
  'Unlicense',
  'WTFPL',
];

// Provide a justification for excluding packages from checks!

var excludeChecksOnPackages = [
  // Example exclusion:
  // {
  //   name: 'example@1.2.3',
  //   reason: 'Some reason as to why this should not be checked',
  // },
];

// -----------------------------------------------------------------------------

if (excludeChecksOnPackages.length) {
  console.log('Not checking these dependencies for license compliance:');
  excludeChecksOnPackages.forEach(p =>
    console.log(`- ${p.name} (${p.reason})`)
  );
  console.log('');
}

var licenseChecker = require('license-checker');

var options = {
  excludePackages: excludeChecksOnPackages.map(p => p.name).join(';'),
  onlyAllow: permittedLicenses.join(';'),
};

licenseChecker.init({ start: `${__dirname}/..`, ...options }, () =>
  console.log('No license issues found')
);
