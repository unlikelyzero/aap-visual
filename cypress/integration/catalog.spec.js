/* Requires real cloud.redhat.com without entitlements */

describe('Catalog', () => {
  beforeEach(function () {
    cy.eyesOpen()
    cy.loginFlow()
  })
  afterEach(function () {
    cy.eyesClose()
  })
  it('verify portfolio view', () => {
    cy.visit('/ansible/catalog/portfolios/')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/catalog/v1.3/portfolios?limit=50&offset=0', {
      statusCode: 200,
    })
    cy.wait(3000)
    //cy.get('[href*="/ansible/automation-hub/repo/published/ansible/tower"]').should('be.visible')
    cy.wait(1000)
    //cy.eyesCheckWindow()
    //cy.get('.card-list-switcher > div > :nth-child(1)').click()
    //cy.eyesCheckWindow('Verify Collecions View Filtered for Tower - Toggled')
  })
})
