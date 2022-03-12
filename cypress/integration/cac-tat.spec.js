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


    it.only('preenche os campos obrigatórios e envia o formularo', () =>{
        cy.get('#firstName').type('mateus')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('mateus@gmail.com')
        cy.get('#phone').type('11993654471')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

}); // close describe