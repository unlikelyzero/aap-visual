/* Requires real cloud.redhat.com account */

describe('Automation Services Catalog', () => {
  beforeEach(function () {
    cy.eyesOpen()
    cy.loginFlow()
    cy.intercept(
      'https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token'
    ).as('token')
  })
  afterEach(function () {
    cy.eyesClose()
  })

  it('Verify Portfolios view for Tower EmptyState', () => {
    /*cy.intercept(
      '/api/automation-hub/_ui/v1/repo/published/?keywords=tower&tags=cloud&deprecated=false&offset=0&limit=12',
      (req) => {
        req.reply((res) => {
          console.log('original response from the server is %s %o', typeof res.body, res.body)
          expect(res.body.data[0].name).to.contain('tower')
          const modified_body = res.body
          //10 years in the past
          modified_body.data[0].latest_version.created_at = '2010-11-09T18:22:12.223143Z'
          res.send(modified_body)
        })
      }
    )*/

    cy.intercept('**/api/catalog/v1.3/portfolios?limit=50&offset=0').as("catalog_request")
    cy.visit('/ansible/catalog/portfolios')
    cy.wait(['@token', '@catalog_request'])
    cy.get('#name').type("Receptor IQE Test{enter}")
    /*cy.intercept('GET', '/portfolios?limit=50&offset=0&filter[name][contains_i]=**', {
      statusCode: 200,
    })*/
    cy.wait(10000)
    cy.get('.pf-c-empty-state__content').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
  })
})
