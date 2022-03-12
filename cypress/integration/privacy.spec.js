
// ._ é o loudash | .times é uma função, que recebe como primeiro argumento a quantidade de vez que queremos executar essa função | 
Cypress._.times(5, () => {
it.only('testa a página da política de privavidade de forma independente', () =>{
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
});

});