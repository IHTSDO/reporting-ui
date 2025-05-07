export default class Utils {
    branch: string;
    project: string;
    task: string;
    loginTimeoutInSeconds = 30_000;
    dropDownTimeoutInSeconds = 30_000;

    constructor() {
        this.branch = 'MAIN';
        this.project = '';
        this.task = '';
    }

    login(url: string, username: string, password: string): void {
        cy.clearAllCookies();
        cy.visit(url);
        cy.contains('Please Log In');
        cy.get('#username').clear();
        cy.get('#username').type(username);
        cy.get('#password').clear();
        cy.get('#password').type(password, {log: false});
        cy.get('button#submit', {timeout: this.loginTimeoutInSeconds}).click({force: true});
    }

    logout(): void {
        cy.contains('Logout').click();
        cy.clearAllCookies();
    }

    selectBranchByName(newBranch: string): void {
        cy.get('[data-test="dropdown-branch"]', {timeout: this.dropDownTimeoutInSeconds}).click();
        cy.get('[href="/reporting/' + newBranch + '"]', {timeout: this.dropDownTimeoutInSeconds}).click();
        cy.get('[data-test="dropdown-branch"]').should('contain.text', newBranch);
        this.branch = newBranch;
    }

    selectProjectByName(newProject: string): void {
        cy.get('[data-test="dropdown-project"]', {timeout: this.dropDownTimeoutInSeconds}).click();
        cy.get('[href="/reporting/' + this.branch + '/' + newProject + '"]', {timeout: this.dropDownTimeoutInSeconds}).click();
        cy.get('[data-test="dropdown-project"]').should('contain.text', newProject);
        this.project = newProject;
    }

    selectTaskByName(newTask: string): void {
        cy.get('[data-test="dropdown-task"]', {timeout: this.dropDownTimeoutInSeconds}).click();
        cy.get('[href="/reporting/' + this.branch + '/' + this.project + '/' + newTask + '"]', {timeout: this.dropDownTimeoutInSeconds}).click();
        cy.get('[data-test="dropdown-task"]').should('contain.text', newTask);
        this.task = newTask;
    }

    selectReportByName(reportGroup: string, reportName: string): void {
        cy.contains('div', reportGroup).click();
        cy.contains('div', reportName).click();
    }
}
