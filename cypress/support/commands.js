// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginFlow', () => {
    cy.visit('https://cloud.redhat.com');
    cy.get('.pf-m-primary').click();
    cy.get('#username').type(Cypress.env('USERNAME'), { log: false });
    cy.get('#login-show-step2').click();
    cy.intercept('POST', 'https://sso.redhat.com/auth/realms/redhat-external/rhdtools/loginExists', {
        statusCode: 200,
    });
    cy.get('#password').type(Cypress.env('PASSWORD'), { log: false });
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    });
    cy.intercept('https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token').as('token');
    cy.get('#kc-login').click();
    cy.wait('@token')
})
