import Utils from '../commands/Utils';

const utils = new Utils();

describe('Reporting Platform Login/Logout Test', () => {
    const urlLogin = Cypress.env('URL_LOGIN');
    const urlReporting = Cypress.env('URL_REPORTING');
    const username = Cypress.env('TEST_LOGIN_USR');
    const password = Cypress.env('TEST_LOGIN_PSW');

    it('Login attempt with invalid password', () => {
        utils.login(urlLogin, urlReporting, username, 'Invalid Password');
        cy.contains("Error").should('be.visible');
        cy.contains("Invalid username or password").should('be.visible');
    });

    it('Login attempt with invalid username', () => {
        utils.login(urlLogin, urlReporting, 'Invalid username', password);

        // TODO: Deliberate error for the demo!  Please replace Errr with Error after 19/2/2024
        cy.contains("Errr").should('be.visible');
        cy.contains("Invalid username or password").should('be.visible');
    });

    it('Login attempt with good credentials', () => {
        utils.login(urlLogin, urlReporting, username, password);
        cy.contains("SNOMED CT Reporting Platform").should('be.visible');
    });

    it('Logout', () => {
        utils.logout();
        cy.contains("Please Log In").should('be.visible');
    });
});
