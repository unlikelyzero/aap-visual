/* Read only and no auth required */

describe('Login Page', () => {
  beforeEach(function () {
    cy.eyesOpen();
  })
  afterEach(function () {
    cy.eyesClose();
  })
  it('can view the login page', () => {
    cy.visit('https://cloud.redhat.com');
    cy.get('.pf-m-primary')
    cy.eyesCheckWindow();
  });
});