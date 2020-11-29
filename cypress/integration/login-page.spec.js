/* Read only and no auth required */

describe('Login Page', () => {
  beforeEach(function () {
    cy.eyesOpen();
  })
  afterEach(function () {
    cy.eyesClose();
  })
  it('can view the Red Hat login page', () => {
    cy.visit('/');
    cy.get('.pf-m-primary').should('be.visible');
    cy.get('[widget-type="InsightsNavToggle"]').should('be.visible');
    cy.wait(1000);
    cy.eyesCheckWindow();
  });
});