/* Requires real cloud.redhat.com without entitlements */

describe('Automation Analytics', () => {
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

  it('Verify Clusters View - Basic', () => {
    cy.intercept('GET', '/api/tower-analytics/v0/chart30/', {
      fixture: 'automation-analytics/chart30-normal.json',
    }).as('chart30')
    cy.intercept('GET', '/api/tower-analytics/v0/modules/', {
      fixture: 'automation-analytics/modules30-normal.json',
    }).as('modules30')
    cy.intercept('GET', '/api/tower-analytics/v0/templates/', {
      fixture: 'automation-analytics/templates30-normal.json',
    }).as('templates30')

    cy.visit('/ansible/automation-analytics/clusters')
    cy.wait(['@token', '@chart30', '@modules30', '@templates30'])
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    })
    cy.get('#d3-bar-chart-root').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
    //TODO
    //cy.get('[style="fill: rgb(110, 198, 100);"] > [x="519"]').trigger('mouseover', {bubbles:true});
    //cy.eyesCheckWindow('Verify Clusters View - Basic - Hoverover');
  })

  it('Verify Clusters View - Empty', () => {
    cy.intercept('GET', '/api/tower-analytics/v0/chart30/', {
      fixture: 'automation-analytics/chart30-empty.json',
    }).as('chart30')

    cy.visit('/ansible/automation-analytics/clusters')
    cy.wait(['@token', '@chart30'])
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    })
    cy.get('#d3-bar-chart-root').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
  })

  it('Verify Organization Statistics View - Empty', () => {
    cy.visit('/ansible/automation-analytics/organization-statistics')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    })
    cy.get('#d3-grouped-bar-chart-root').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
  })

  it('Verify Job Explorer View - Empty', () => {
    cy.visit('/ansible/automation-analytics/job-explorer')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    })
    cy.get('#filterable-toolbar-with-chip-groups').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
  })

  it('Verify Notifications View - Empty', () => {
    cy.visit('/ansible/automation-analytics/notifications')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    })
    cy.get('.pf-c-empty-state__content > .pf-c-title').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
  })

  it('Verify Automation Calculator View - Basic', () => {
    cy.intercept('GET', '/api/tower-analytics/v0/roi_templates/', {
      fixture: 'automation-analytics/roi365-normal.json',
    }).as('roi365')
    cy.visit('ansible/automation-analytics/automation-calculator')
    cy.wait(['@token', '@roi365'])
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {
      statusCode: 200,
    })
    cy.get('#d3-roi-chart-root').should('be.visible')
    cy.wait(1000)
    cy.eyesCheckWindow()
    //TODO
    //cy.get('[x="25"]').trigger('mouseover', {bubbles:true});
    //cy.eyesCheckWindow('Verify Automation Calculator View - Basic - Hoverover');
  })
})
