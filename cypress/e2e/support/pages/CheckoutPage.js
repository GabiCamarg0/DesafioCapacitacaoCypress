class CheckoutPage {
  fillCheckoutForm(firstName, lastName, postalCode) {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
  }

  verifyCheckoutTotal() {
    cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69');
  }

  completePurchase() {
    cy.get('[data-test="finish"]').click();
  }
}

export default new CheckoutPage();
