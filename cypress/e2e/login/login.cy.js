/// <reference types="Cypress" />

// Definindo o comando customizado para login
Cypress.Commands.add('login_teste', (username, password) => {
  cy.visit('https://www.saucedemo.com/');  // URL da página de login
  cy.get('[data-test="username"]').type(username); // Campo de usuário
  cy.get('[data-test="password"]').type(password); // Campo de senha
  cy.get('[data-test="login-button"]').click(); // Clica no botão de login
});

describe('Teste funcional de login', () => {
    
    // Teste de login com credenciais válidas
    it('Deve realizar o login com sucesso', () => {
        cy.login_teste('standard_user', 'secret_sauce'); // Usando as credenciais válidas
        cy.get('.title').should('contain', 'Products'); // Verifica se a página de produtos é carregada
    });

    // Teste de login com nome de usuário incorreto
    it('Validando login incorreto', () => {
        cy.login_teste('incorreto', 'secret_sauce');
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    // Teste de login com senha incorreta
    it('Validar senha incorreta', () => {
        cy.login_teste('standard_user', 'senha_errada');
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
});
