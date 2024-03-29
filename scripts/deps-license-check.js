// A list of licenses permitted as dependencies

const permittedLicenses = [
  'Apache',
  'BSD',
  'CC',
  'ISC',
  'MIT',
  'MPL',
  'ODC-By-1.0',
  'Public Domain',
  'Python-2.0',
  'Unlicense',
  'WTFPL',
];

// Provide a justification for excluding packages from checks!

const excludeChecksOnPackages = [
  // Example exclusion:
  // {
  //   name: 'example@1.2.3',
  //   reason: 'Some reason as to why this should not be checked',
  // },
];

// -----------------------------------------------------------------------------

if (excludeChecksOnPackages.length) {
  console.log('Not checking these dependencies for license compliance:');
  excludeChecksOnPackages.forEach((p) =>
    console.log(`- ${p.name} (${p.reason})`)
  );
  console.log('');
}

const options = {
  excludePackages: excludeChecksOnPackages.map((p) => p.name).join(';'),
  onlyAllow: permittedLicenses.join(';'),
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const licenseChecker = require('license-checker');
licenseChecker.init({ start: `${__dirname}/..`, ...options }, () =>
  console.log('No license issues found')
);
