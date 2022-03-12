// iniciar um novo comando no cypress (Cypress.Commands.add)
// primeiro argumento é nome do comando (fillMandatoryFieldsAndSubmit), e o segundo é a função do arrow function. 
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',  () => {
    cy.get('#firstName').type('mateus')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('mateus@gmail.com')
    //cy.get('#phone').type('11993654471')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
});