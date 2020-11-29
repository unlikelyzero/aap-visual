/* Requires real cloud.redhat.com account */

describe('Automation Analytics', () => {
  beforeEach(function () {
    cy.eyesOpen();
    cy.loginFlow();
    cy.intercept('https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token').as('token');
  });
  afterEach(function () {
    cy.eyesClose();
  });

  it('Verify Collecions View Filtered for Tower', () => {

    cy.intercept('/api/automation-hub/_ui/v1/repo/published/?keywords=tower&tags=cloud&deprecated=false&offset=0&limit=12', (req) => {
      req.reply((res) => {
        console.log('original response from the server is %s %o', typeof res.body, res.body)
        expect(res.body.data[0].name).to.contain("tower")
        //expect(res.body.data[0].latest_version.created_at).to.
        const modified_body = res.body
        modified_body.data[0].latest_version.created_at = "2010-11-09T18:22:12.223143Z"
        res.send(modified_body)
      })
    })

    cy.visit('https://cloud.redhat.com/ansible/automation-hub/?page_size=12&view_type=list&keywords=tower&tags=cloud')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {statusCode: 200});
    
    cy.get('[href="/ansible/automation-hub/repo/published/ansible/tower"]').should('be.visible');
    cy.wait(1000);
    cy.eyesCheckWindow();
    cy.get('.card-list-switcher > div > :nth-child(1)').click()
    cy.eyesCheckWindow('Verify Collecions View Filtered for Tower - Toggled');
  });
  
  it('Verify Collecions View - Tower 3.8.0 Details', () => {
    //This will have to be changed when tower 3.8.0 is EOL
    cy.intercept('/api/automation-hub/_ui/v1/repo/published/ansible/tower/?version=3.8.0', (req) => {
      req.reply((res) => {
        console.log('original response from the server is %s %o', typeof res.body, res.body)
        expect(res.body.latest_version.name).to.contain("tower")
        //expect(res.body.data[0].latest_version.created_at).to.
        const modified_body = res.body
        modified_body.latest_version.created_at = "2010-11-09T18:22:12.223143Z"
        res.send(modified_body)
      })
    })

    cy.visit('https://cloud.redhat.com/ansible/automation-hub/repo/published/ansible/tower?version=3.8.0')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {statusCode: 200});
    
    cy.get('.pf-c-title').should('be.visible')
    cy.wait(1000);
    cy.eyesCheckWindow();
  });
  
  it('Verify Partners View - ansible', () => {

    cy.visit('https://cloud.redhat.com/ansible/automation-hub/partners?page_size=24&sort=name&keywords=ansible')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {statusCode: 200});
    
    cy.get('.pf-c-card__title').should('be.visible')
    cy.wait(1000);
    cy.eyesCheckWindow();
  });

  it('Verify My Namespaces View', () => {

    cy.visit('https://cloud.redhat.com/ansible/automation-hub/my-namespaces')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {statusCode: 200});
    
    cy.get('.pf-c-empty-state__content').should('be.visible')
    cy.wait(1000);
    cy.eyesCheckWindow();
  });

  it('Verify Connect to Hub View', () => {

    cy.visit('https://cloud.redhat.com/ansible/automation-hub/token')
    cy.wait('@token')
    cy.intercept('GET', 'https://cloud.redhat.com/api/rbac/v1/access/?application=&limit=100', {statusCode: 200});
    
    cy.get('.pf-c-title').should('be.visible')
    cy.wait(1000);
    cy.eyesCheckWindow();
  });
  
});