class CartPage {
  verifyProductsInCart() {
    cy.get('.cart_item').should('have.length', 3);
    cy.get('.cart_item').each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('be.visible');
    });
  }

  proceedToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();
