'use strict'; // Composer main entry.

// Composer Dependencies.

const facebookOutputComposer = require('./facebook');

// Main Composer.

const outputComposer = (function() {

  // Public functions.

  let publicOutputComposers = {
    composeFBOutputMessage: facebookOutputComposer,
  };

  return publicOutputComposers;
})();

module.exports = outputComposer;
