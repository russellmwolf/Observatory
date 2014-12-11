Package.describe({
  name: 'nrswolf:observatory',
  summary: 'Export CSVs of collection data for site analytics.',
  version: '1.0.0',
  git: 'git@github.com:nrswolf/observatory.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('nrswolf:observatory.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('nrswolf:observatory');
  api.addFiles('nrswolf:observatory-tests.js');
});
