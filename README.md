# Ansible Automation Platform Visual Tests [![aap-visual](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/q1ok32&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/q1ok32/runs)

This repo contains the visual tests run against the Ansible Automation Platform(AAP).

## Purposes of this repo

1. Create a contract for visual changes between patternfly, platformexp, and the AAP applications
2. Create a contract for ouia attributes which impact AAP applications
3. Give working examples of Visual Testing and Cypress best practices for Ansible and Clouddot engineers
4. Share common tooling and versioning for Github Actions, Cypress, and Applitools
5. Provide a reliable source of Visual Changes which impact Marketing and Support stakeholders

## How to install

    1. npm install

## How to run tests locally

    1. Set CYPRESS_USERNAME and CYPRESS_PASSWORD env variables to your cloud.redhat.com account credentials
    2. Set APPLITOOLS_API_KEY env variable
    3. npm run cy:open
    OR
    3. npm run cy:open:prod-beta to run against prod beta

## How to run in CI

    1. Click Github Actions Tab
    2. `tests`
    3. Execute Workflow

Alternatively, the tests will run nightly or on PRs automatically

## Best Practices

    1. Organize staging, prod, beta with configs https://github.com/unlikelyzero/aap-visual/blob/main/cypress/config/prod-beta.json
    2. Select OUIA attributes first https://github.com/unlikelyzero/aap-visual/blob/main/cypress/support/index.js
    3. ...

## Links and Info
https://www.cypress.io/

https://eyes.applitools.com/

https://cloud.redhat.com/
