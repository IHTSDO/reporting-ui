import Utils from '../commands/Utils';

const utils = new Utils();

describe('Reporting Platform Login/Logout Test', () => {
    const urlReporting = Cypress.env('URL_REPORTING');
    const username = Cypress.env('TEST_LOGIN_USR');
    const password = Cypress.env('TEST_LOGIN_PSW');

    it('Login attempt with invalid password', () => {
        utils.login(urlReporting, username, 'Invalid Password');
        cy.contains("Error").should('be.visible');
        cy.contains("Invalid username or password").should('be.visible');
    });

    it('Login attempt with invalid username', () => {
        utils.login(urlReporting, 'Invalid username', password);
        cy.contains("Error").should('be.visible');
        cy.contains("Invalid username or password").should('be.visible');
    });

    it('Login attempt with good credentials', () => {
        utils.login(urlReporting, username, password);
        cy.contains("SNOMED CT Reporting Platform").should('be.visible');
    });

    it('Logout', () => {
        utils.logout();
        cy.contains("Please Log In").should('be.visible');
    });
});
