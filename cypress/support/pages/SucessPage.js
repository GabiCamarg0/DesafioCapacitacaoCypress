class SuccessPage {
  verifyPurchaseSuccess() {
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
  }
}

export default new SuccessPage();
