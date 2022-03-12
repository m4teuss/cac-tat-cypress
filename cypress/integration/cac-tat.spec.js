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

    it('preenche os campos obrigatórios e envia o formularo', () =>{
        const longtext = "Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste"
        
        cy.get('#firstName').type('mateus')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('mateus@gmail.com')
        //cy.get('#phone').type('11993654471')
        cy.get('#open-text-area').type(longtext, {delay: 0}) //  objeto options com a propriedade {delay: 0}, para o teste rodar mais rápido.  
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.get('#firstName').type('mateus')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('mateus@gmail,com')
       // cy.get('#phone').type('11993654471')
        cy.get('#open-text-area').type('teste ')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('abcdefghij').should('have.value', '')
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
        cy.get('#firstName').type('mateus')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('mateus@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste ')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('mateus').should('have.value' , 'mateus').clear().should('have.value', '')
        cy.get('#lastName').type('Silva').clear()
        cy.get('#email').type('mateus@gmail,com').clear()
        cy.get('#phone').type('11993657412').clear()
        cy.get('#open-text-area').type('teste ')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    it.only('envia o formalário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });



}); // close describe