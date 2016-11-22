'use strict';

// Dependencies.

const _ = require('lodash');

// All configurations will extend these options

let all = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongoDB: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV

module.exports = function(env){
  console.log(`=> NODE_ENV: ${env}`);
  return _.merge(all, require('./' + env + '.js') || {});
}
