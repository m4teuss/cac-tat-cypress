/// <reference types="Cypress"/>


describe('Central de atendimento do cliente TAT', function() { 

    // function Arrow function
    beforeEach('visita página', () =>{
        cy.visit('./src/index.html')
    })
    
    // function callback
    it('verifica o título da aplicação', function() {

        // validando titulo html 
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

}); // close describe