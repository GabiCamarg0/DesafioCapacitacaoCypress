/// <reference types="Cypress" />

// Comando customizado de login
Cypress.Commands.add('login_teste', (username, password) => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

describe('Teste funcional de login', () => {
  
  before(() => {
    cy.log(' Iniciando suite de testes de login');
  });

  beforeEach(() => {
    cy.log(' Preparando ambiente de teste');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.log(' Teste finalizado - limpando estado');
  });

  after(() => {
    cy.log(' Finalizando a suíte de testes de login');
  });

  // Teste com credenciais válidas
  it('Deve realizar o login com sucesso', () => {
    cy.login_teste('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  // Teste com usuário incorreto
  it('Validando login com nome de usuário incorreto', () => {
    cy.login_teste('incorreto', 'secret_sauce');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  // Teste com senha incorreta
  it('Validar login com senha incorreta', () => {
    cy.login_teste('standard_user', 'senha_errada');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
});
