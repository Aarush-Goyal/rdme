#! /usr/bin/env node
require('colors');

const parseArgs = require('minimist')(process.argv.slice(2), {
  alias: {
    // Allows --version, -v, -V
    v: 'version',
    V: 'version',

    // // Allows --help, -h, -H
    h: 'help',
    H: 'help',
  },
});

require('./cli')(parseArgs._[0], parseArgs._.slice(1), parseArgs)
  .then(() => process.exit())
  .catch(err => {
    if (err) {
      // `err.message` is from locally thrown Error objects
      // `err.error` is from remote API errors
      console.error((err.message || err.error).red);
      if (err.description) console.warn(err.description);
      if (err.errors) console.warn(err.errors);
    }

    return process.exit(1);
  });
