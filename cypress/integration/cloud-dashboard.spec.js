/* Requires real cloud.redhat.com without entitlements */

describe('Red Hat Ansible Dashboard View', () => {
  beforeEach(function () {
    cy.eyesOpen();
    cy.visit('https://cloud.redhat.com');
    cy.get('.pf-m-primary').click();
    cy.get('#username').type(Cypress.env('USERNAME'));
    cy.get('#login-show-step2').click();
    cy.intercept('POST', 'https://sso.redhat.com/auth/realms/redhat-external/rhdtools/loginExists', {
        statusCode: 200,
    });
    cy.get('#password').type(Cypress.env('PASSWORD'));
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    });
    cy.intercept('https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token').as('token');
    cy.get('#kc-login').click();
    cy.wait('@token')
  })
  afterEach(function () {
    cy.eyesClose();
  })
  it('Verify the Ansible Cards and links', () => {
    cy.intercept('https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token').as('token');
    cy.visit('https://cloud.redhat.com/')
    cy.wait('@token')
    cy.intercept(
      'GET',
      'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', 
      {
      statusCode: 200,
    });
    cy.get('[ouiaid="red_hat ansible automation platform"]').should('be.visible');
    cy.get('[href="/ansible/automation-analytics"]').should('be.visible');
    cy.get('[href="/ansible/automation-hub"]').should('be.visible');
    cy.get('[href="/ansible/catalog"]').should('be.visible');
    cy.eyesCheckWindow();
  });
  it('Verify not entitled text for Ansible', () => {
    cy.visit('https://cloud.redhat.com/ansible/automation-analytics')
    cy.wait(['@token', '@token'])
    cy.get('.pf-c-modal-box__header > .pf-c-title').should('have.text', 'Ansible Automation Platform services requires a valid subscription')
    cy.eyesCheckWindow();
  });
});