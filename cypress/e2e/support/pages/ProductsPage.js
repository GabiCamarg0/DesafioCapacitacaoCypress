class ProductsPage {
  verifyPageLoaded() {
    cy.get('.title').should('contain', 'Products');
  }

  sortByPriceLowToHigh() {
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)');
  }

  addProductToCart(productName) {
    cy.contains(productName).click();
    cy.get('.btn_primary').click();
    cy.get('[data-test="back-to-products"]').click();
  }

  verifyProductInCart() {
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '3');
  }
}

export default new ProductsPage();
