import Utils from '../commands/Utils';

const utils = new Utils();

const urlReporting = Cypress.env('URL_REPORTING');
const username = Cypress.env('TEST_LOGIN_USR');
const password = Cypress.env('TEST_LOGIN_PSW');

describe('Reporting Platform Login/Logout Test', () => {
    // Login is flaky.
    // Often (but not always) the serviceReferer part of the request is lost
    // and login is stuck on the Account page instead of being redirected to the RP.
    // Sometimes it works fine, sometimes it does not work at all.

    /*
    it('Login attempt with invalid password', () => {
        utils.login(urlReporting, username, 'Invalid Password');
        cy.contains("Invalid username or password").should('be.visible');
    });

    it('Login attempt with invalid username', () => {
        utils.login(urlReporting, 'Invalid username', password);
        cy.contains("Invalid username or password").should('be.visible');
    });
    */

    it('Login attempt with good credentials', () => {
        utils.login(urlReporting, username, password);
        cy.contains('SNOMED CT Reporting Platform', {timeout: 15000}).should('be.visible');
    });

    it('Logout', () => {
        utils.logout();
        cy.contains('Welcome to SNOMED International', {timeout: 15000}).should('be.visible');
        cy.contains('Sign In').should('be.visible');
    });

});
