const {join} = require('node:path');

module.exports = {
  extends: [
    require.resolve('@commitlint/config-conventional', {
      paths: [join(__dirname, 'frontend')],
    }),
  ],
};
