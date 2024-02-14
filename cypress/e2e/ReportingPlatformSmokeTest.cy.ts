import Utils from '../commands/Utils';

const utils = new Utils();

// Spec for test is here: https://app.guidde.com/share/playbooks/pv6fj2bgpMUQkxYmxAEX2v?origin=9tgqTb2fLmPaMQXdqgEnf9oUXHx1
describe('Reporting Platform Smoke Test', () => {
    const urlLogin = Cypress.env('URL_LOGIN');
    const urlReporting = Cypress.env('URL_REPORTING');
    const username = Cypress.env('TEST_LOGIN_USR');
    const password = Cypress.env('TEST_LOGIN_PSW');
    const reportHistoryTimeoutInSeconds = 15_000;
    const reportTimeoutInSeconds = 99_000;

    it('Login', () => {
        utils.login(urlLogin, urlReporting, username, password);
    });

    it('Select branch MAIN/SNOMEDCT-CH', () => {
        utils.selectBranchByName('MAIN/SNOMEDCT-CH');
    });

    it('Select project CHPRE', () => {
        utils.selectProjectByName('CHPRE');
    });

    it('Select branch MAIN', () => {
        utils.selectBranchByName('MAIN');
    });

    it('Select "Release Validation"/"New Descriptions" report', () => {
        utils.selectReportByName('Release Validation', 'New Descriptions');
        cy.get('[data-test="report-title"]').should('include.text', 'New Descriptions');
        cy.get('[data-test="report-description"]').should('include.text', 'This report lists all discriptions');
    });

    it('Select "Ad-Hoc Queries"/"List all Concepts" report', () => {
        utils.selectReportByName('Ad-Hoc Queries', 'List all Concepts');
        cy.get('[data-test="report-title"]').should('include.text', 'List all Concepts');
        cy.get('[data-test="report-description"]').should('include.text', 'This report lists all concepts that match a given ECL, with descriptions, parents and the inferred expression');
    });

    it('Fill in form for "Find Concepts Across All Extensions" and schedule it', () => {
        cy.contains('button', 'Configure Query').click();
        cy.get('#ECL').clear();
        cy.get('#ECL').type('< 195967001 |Asthma (disorder)|');
        cy.contains('button', 'Run Query').click();
        cy.get('[data-test="report-parameters-0"]', {timeout: reportHistoryTimeoutInSeconds}).contains('195967001');
    });

    it('Ensure report is scheduled', () => {
        cy.get('[data-test="report-info-0"]', {timeout: reportTimeoutInSeconds})
            .contains('Scheduled', {timeout: reportTimeoutInSeconds});
    });

    it('Ensure report runs', () => {
        cy.get('[data-test="report-info-0"]', {timeout: reportTimeoutInSeconds})
            .contains('Running', {timeout: reportTimeoutInSeconds});
    });

    it('Ensure report has completed', () => {
        cy.get('[data-test="report-info-0"]', {timeout: reportTimeoutInSeconds})
            .contains('Complete', {timeout: reportTimeoutInSeconds});
    });

    it('Logout', () => {
        utils.logout();
        cy.contains('Please Log In').should('be.visible');
    });

});

