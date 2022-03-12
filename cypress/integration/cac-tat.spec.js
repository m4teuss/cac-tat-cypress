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
        cy.get('#phone-checkbox').check()
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

    it('envia o formalário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('Testando [cy.contain]', () => {
        cy.get('#firstName').type('mateus')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('mateus@gmail,com')
        cy.get('#open-text-area').type('teste ')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    });

    it('seleciona um produto (youtube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get("#product").select(1).should('have.value', 'blog') // indice = (1)
    });

    it('marca o tipo de antendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    });

    it('Marca cada tipo de atendimento' , () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)   // verificação intermediaria para saber quantos tem  3
          .each(function ($radio){    // each: para passar por cada um dos elementos. Each recebe uma função que por argumento recebe todos elementos (1 2 3)
            cy.wrap($radio).check()   // Para cada elemento usamos o (Wrap) para empacotar o elemento e mandar o comando (check ou uncheck)
            cy.wrap($radio).should('be.checked')  // marca o primeiro verifica que foi marcado, marca o segundo verifica etc..
        }); 

    });

    it('marca ambos checkboxes, depois desrmarca o útimo', () => {
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked') //Marca 2 checks, last().uncheck: faz desmarcar o ultimo e should: valida que o ultimo não esta marcado.
    })

    it('seleciona um arquivo da pasta Fixture', () => {
        cy.get('#file-upload')
          .should('not.have.value') // verifica que não tem valor ainda, nada anexado
          .selectFile('./cypress/fixtures/example.json') // selectFile: anexar arquivo no cypress e passou caminho relativo
          
          .should(function($input){  //Should: pode receber função / Criando uma função que recebe o input (elemento) como parametro
          //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json');  // ($input[0] = primeiro input  | .files[0].name) = pegar o primeiro objeto do array | .to.equal('example.json'); = comparar 
          });
    });

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})  // {action: 'drag-drop'}: simula que estamos arrastando o arquivo ao invés de clicar.    
        .should(function($input){  
          expect($input[0].files[0].name).to.equal('example.json');
       }); 
    }); 
    
    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get ('input[type="file"]')
          .selectFile('@sampleFile') 
          .should(function($input){  
            expect($input[0].files[0].name).to.equal('example.json');
        });
    });


    // <a href="privacy.html" target="_blank"> => Toda vez que existir [target="_blank"] o navegador abrirá em uma aba diferente
    // O Comando invoke remove o (target="_blank")
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') // have.attr = tem.atributo target _blank
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get("#privacy a")
        .invoke('removeAttr', 'target', '_blank') // remove o atributo target
        .click() // e clica no link e abre a pagina na aba do cypress
        cy.contains('Talking About Testing').should('be.sible')
    });


}); // close describe