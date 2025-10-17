import Utils from '../commands/Utils';

const utils = new Utils();

const urlReporting = Cypress.env('URL_REPORTING');
const username = Cypress.env('TEST_LOGIN_USR');
const password = Cypress.env('TEST_LOGIN_PSW');

describe('Reporting Platform Smoke Test', () => {
    const reportName = 'List all Reports';
    const reportDescription = 'This report lists all reports available to users, along with their descriptions, production status and tags.';
    const reportHistoryTimeoutInSeconds = 15_000;
    const reportTimeoutInSeconds = 60_000 * 10;  // Takes ages for reporting on dev to startup!

    it('Login', () => {
        utils.login(urlReporting, username, password);
        cy.intercept('GET', '**/auth').as('auth');
        cy.intercept('GET', '**/jobs/Report/').as('getReports');

        cy.wait('@auth').then((interceptions) => {
            assert.equal(interceptions.response.statusCode, 200);
        });

        cy.wait('@getReports').then((interceptions) => {
            assert.equal(interceptions.response.statusCode, 200);
        });
    });

    it('Ensure the application loads', () => {
        cy.get('#sidebar div.reports').find('div.report')
            .its('length')
            .then((count) => {
                expect(count).to.greaterThan(0);
                const reportsFound = count.toString() + ' found';
                cy.get('#sidebar div.head > h3').should('be.visible').and('contain.text', reportsFound);
            });
    });

    it('Select branch MAIN', () => {
        utils.selectBranchByName('MAIN');
    });

    it('Verify Search for a report is working', () => {
        cy.get('#sidebar div.head').find('input.searchbar').clear().type(reportName.toLowerCase());

        cy.get('#sidebar div.reports').find('div.report')
            .should('contain.text', reportName)
            .its('length')
            .then((count) => {
                expect(count).to.greaterThan(0);
                const reportsFound = count.toString() + ' found';
                cy.get('#sidebar div.head > h3').should('be.visible').and('contain.text', reportsFound);
            });
    });

    it('Verify report`s details are displayed when clicking on them in the left hand toolbar', () => {
        cy.get('#sidebar div.reports').find('div.report').first().click();
        cy.get('[data-test="report-title"]').should('include.text', reportName);
        cy.get('[data-test="report-description"]').should('include.text', reportDescription);
    });

    it(`Verify report can be run: "${reportName}"`, () => {
        cy.intercept('POST', '**/runs').as('runReport');
        cy.contains('button', 'Run Query').click();

        cy.wait('@runReport').then((interceptions) => {
            assert.equal(interceptions.request.body.jobName, reportName);
            assert.equal(interceptions.response.statusCode, 200);
            assert.equal(interceptions.response.body.status, 'Scheduled');
        });
    });

    it('Ensure report runs', () => {
        cy.get('[data-test="report-info-0"]', {timeout: reportTimeoutInSeconds})
            .contains('Running', {timeout: reportTimeoutInSeconds});

    });

    it('Ensure report has completed', () => {
        cy.get('[data-test="report-info-0"]', {timeout: reportTimeoutInSeconds})
            .contains('Complete', {timeout: reportTimeoutInSeconds});
    });

    it('Ensure this report can be deleted', () => {
        cy.get('[data-test="report-history-row"]', {timeout: reportHistoryTimeoutInSeconds}).its('length').then((count) => {
            const runs = count;
            cy.get('[data-test="report-history-row"]').first().click();
            cy.get('button.delete-button').should('be.visible').click();
            cy.get('#delete-modal').contains('button', 'Delete Reports').click();
            cy.get('[data-test="report-history-row"]', {timeout: reportHistoryTimeoutInSeconds}).should('have.length.lessThan', runs);
        });
    })

   it('Logout', () => {
        utils.logout();
        cy.contains('Welcome to SNOMED International', {timeout: 15000}).should('be.visible');
        cy.contains('Sign In').should('be.visible');
   });

});

