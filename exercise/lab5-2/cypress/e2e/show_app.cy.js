/* eslint-disable no-undef */


// describe('template spec', () => {
//     beforeEach('login first',function(){
//         cy.visit('http://localhost:3000');
//         cy.get('input[name="username"]').type('ben');
//         cy.get('input[name="password"]').type('3743');
//         cy.contains('login').click();

//     });
//     it('passes', () => {
//         cy.visit('http://localhost:3000');
//         // cy.visit('https://example.cypress.io');
//         cy.contains('watch');
//         cy.contains('shows app, Department of Computer Science, University of the Pacific 2023');

//     });
//     it('add new show', function(){
//         // cy.visit('http://localhost:3000');

//         cy.contains('recommend new show').click();
//         cy.get('input[name="showtitle"]').type('test');
//         cy.get('input[name="genre"]').type('test');
//         cy.get('input[name="url"]').type('test');
//         cy.get('input[name="likes"]').type(20);
//         cy.contains('save').click();

//     });


// });

describe('Shows app tests', function() {
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user={
            name:'Bens',
            username:'benson',
            password:'3743'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.visit('http://localhost:3000');


    });
    it('shows app login by default', function(){
        cy.contains('username');
        cy.contains('password');
        cy.contains('login');
    });
    describe('login',function(){
        it('succeeds with correct credentials', function() {


            cy.get('input[name="username"]').type('benson');
            cy.get('input[name="password"]').type('3743');
            cy.contains('login').click();
            // cy.contains('Bens is logged in');
        });
        it('fails with wrong credentials', function() {
            cy.get('input[name="username"]').type('benson');
            cy.get('input[name="password"]').type('3742');
            cy.contains('login').click();
            cy.get('.error')
                .should('be.visible')
                .and('have.css', 'background-color', 'rgb(156, 43, 46)');
        });


    });
    describe('when logged in',function(){
        beforeEach('login first',function(){
            // cy.contains('logout').click();
            cy.visit('http://localhost:3000');
            cy.get('input[name="username"]').type('benson');
            cy.get('input[name="password"]').type('3743');
            cy.contains('login').click();
        });

        it('a show can be added as in exercise 5.19', function(){
            // cy.visit('http://localhost:3000');

            cy.contains('recommend new show').click();
            cy.get('input[name="showtitle"]').type('test');
            cy.get('input[name="genre"]').type('test');
            cy.get('input[name="url"]').type('test');
            cy.get('input[name="likes"]').type(20);
            cy.contains('save').click();

        });
        // user can like a show
        it('user can like a show', function(){
            // click button named view
            cy.get('button').contains('view').click();
            // click a button named update
            cy.get('button').contains('update').click();



        });
        // user can delete a show
        it('user can delete a show', function(){
            cy.contains('login').click();
            cy.contains('recommend new show').click();
            cy.get('input[name="showtitle"]').type('test');
            cy.get('input[name="genre"]').type('test');
            cy.get('input[name="url"]').type('test');
            cy.get('input[name="likes"]').type(20);
            cy.get('input[name="recommender"]').type('64378e36cf0bd88cf41266f6');
            cy.contains('save').click();
            // click button named delete show
            cy.get('button').contains('delete show').click();


        });




    });





    // beforeEach('login first',function(){
    //     cy.visit('http://localhost:3000');
    //     cy.get('input[name="username"]').type('benson');
    //     cy.get('input[name="password"]').type('3743');
    //     cy.contains('login').click();

    // });
    // it('passes', () => {
    //     cy.visit('http://localhost:3000');
    //     // cy.visit('https://example.cypress.io');
    //     cy.contains('watch');
    //     cy.contains('shows app, Department of Computer Science, University of the Pacific 2023');

    // });
    // it('add new show', function(){
    //     // cy.visit('http://localhost:3000');

    //     cy.contains('recommend new show').click();
    //     cy.get('input[name="showtitle"]').type('test');
    //     cy.get('input[name="genre"]').type('test');
    //     cy.get('input[name="url"]').type('test');
    //     cy.get('input[name="likes"]').type(20);
    //     cy.contains('save').click();

    // });



});


describe(' step6',function(){
    beforeEach('login first',function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user={
            name:'BensON',
            username:'BENSON',
            password:'3744'
        };
        const user2={
            name:'Bensonkam',
            username:'BENSONKAM',
            password:'3743'


        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.request('POST', 'http://localhost:3001/api/users/', user2);
        cy.visit('http://localhost:3000');

    });
    // other users can not see delete button for show they did not recommend
    it('other users can not see delete button for show they did not recommend', function(){
        // cy.contains('logout').click();
        cy.get('input[name="username"]').type('BENSON');
        cy.get('input[name="password"]').type('3744');
        cy.contains('login').click();
        // ADD A SHOW
        cy.contains('recommend new show').click();
        cy.get('input[name="showtitle"]').type('test');
        cy.get('input[name="genre"]').type('test');
        cy.get('input[name="url"]').type('test');
        cy.get('input[name="likes"]').type(20);
        cy.contains('save').click();
        // cy.get('button').contains('delete show').click();

        cy.contains('logout').click();
        cy.get('input[name="username"]').type('BENSONKAM');
        cy.get('input[name="password"]').type('3743');
        cy.contains('login').click();

        // cy.contains('watch').click();
        cy.get('.show').should('not.have.descendants', '.delete-button');




    });


});
