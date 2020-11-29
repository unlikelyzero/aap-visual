# Ansible Automation Platform Visual Tests [![renovate-app badge][renovate-badge]][renovate-app] [![aap-visual](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/q1ok32&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/q1ok32/runs)

This repo contains the visual tests run against the Ansible Automation Platform(AAP).

## Purposes of this repo

1. Create a contract for visual changes between patternfly, platformexp, and the AAP applications
2. Create a contract for ouia attributes which impact AAP applications
3. Give working examples of Visual Testing and Cypress best practices for Ansible and Clouddot engineers
4. Share commoon tooling and versioning for Github Actions, Cypress, and Applitools
5. Provide a reliable source of Visual Changes which impact Marketing and Support stakeholders

## How to install

    1. npm install

## How to run tests locally

    1. Set CYPRESS_USERNAME and CYPRESS_PASSWORD env variables to your cloud.redhat.com account credentials
    2. Set APPLITOOLS_API_KEY env variable
    3. npm run cy:open    

## Links and Info
https://www.cypress.io/

https://eyes.applitools.com/

https://cloud.redhat.com/


[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/