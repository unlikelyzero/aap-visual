// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@applitools/eyes-cypress/commands'

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


//Cannot modify due to https://github.com/cypress-io/cypress/issues/7745
//Cypress.SelectorPlayground.defaults({
 //   selectorPriority: [
 //     "dataouia",
 //     "data-test",
 //     "data-cy",
  //    "id",
 //     "class",
 //     "name",
 //     "tag",
 //     "attributes",
 //    "nth-child",
 //   ],
//  });

Cypress.SelectorPlayground.defaults({
    onElement: ($el) => {
        const dataouia= $el.attr("dataouia");
        if (dataouia) {
            return `[dataouia="${dataouia}"]`;
        }
        // Default behaviour
        return false;
    },
});
