/// <reference types="Cypress" />

import CartPage from "../support/pages/CartPage";
import CheckoutPage from "../support/pages/CheckoutPage";
import LoginPage from "../support/pages/LoginPage";
import ProductsPage from "../support/pages/ProductsPage";

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
  it('Fluxo da compra de produtos', () => {
    // Login no sistema
    LoginPage.login('standard_user', 'secret_sauce');
    ProductsPage.verifyPageLoaded();

    // Ordenando produtos de menor para maior valor
    ProductsPage.sortByPriceLowToHigh();

    // Validação da ordenação dos produtos
    cy.get(':nth-child(1) > [data-test="inventory-item-description"]')
      .should('contain', 'Sauce Labs Onesie');
    cy.get(':nth-child(2) > [data-test="inventory-item-description"]')
      .should('contain', 'Sauce Labs Bike Light');
    cy.get(':nth-child(3) > [data-test="inventory-item-description"]')
      .should('contain', 'Sauce Labs Bolt T-Shirt');

    // Adicionando produtos ao carrinho
    ProductsPage.addProductToCart('Sauce Labs Onesie');
    ProductsPage.addProductToCart('Sauce Labs Bike Light');
    ProductsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Checando a quantidade de produtos no carrinho
    ProductsPage.verifyProductInCart();

    // Acessando o carrinho e verificando os produtos
    cy.get('[data-test="shopping-cart-link"]').click();
    CartPage.verifyProductsInCart();

    // Finalizando o checkout
    CartPage.proceedToCheckout();
    CheckoutPage.fillCheckoutForm('Teste Primeiro Nome', 'Teste Ultimo Nome', '75280750');
    
    // Verificando o total do checkout
    CheckoutPage.verifyCheckoutTotal();

    // Finalizando a compra
    CheckoutPage.completePurchase();
    
  });
});
