// / <reference types="Cypress" />

context('Actions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:6006/iframe.html?id=backtotop--default')
	})

	// https://on.cypress.io/interacting-with-elements

	it('should have the correct text', () => {
		// https://on.cypress.io/type
		cy.getByText('Back to top').should('exist')
	})
})
