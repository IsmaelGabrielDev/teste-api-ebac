/// <reference types= "cypress"/>

import { faker } from '@faker-js/faker';
import contracts from'../contracts/usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  var nome = faker.person.fullName()
  var email = faker.internet.email(nome)
  var senha = faker.internet.password()
  
  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contracts.validateAsync(response.body)
  })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso - PUT', () => {
    cy.cadastrarUsuario(nome, email, senha)
    .should((response) => {
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
      expect(response.status).to.equal(201)
    })
  });

  it('Deve validar um usuário com email inválido - PUT', () => {
    cy.cadastrarUsuario(nome, 'fulano@qa.com', senha)
    .then((response) => {
      expect(response.body.message).to.equal('Este email já está sendo usado')
      expect(response.status).to.equal(400)
    })
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    var email = faker.internet.email(nome)
    cy.cadastrarUsuario(nome, email, senha)
    .then(response => {
      let id = response.body._id

      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
        "nome": "Algusto Sampaio",
        "email": email,
        "password": senha,
        "administrador": "true"
        }
      }).then(response => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
        expect(response.status).to.equal(200)
      })
    })
    
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    var email = faker.internet.email(nome)
    cy.cadastrarUsuario(nome, email, senha)
    .then(response => {
      let id = response.body._id

      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`
      }).then(response =>{
        expect(response.body.message).to.equal('Registro excluído com sucesso')
        expect(response.status).to.equal(200)
      })
    })

  });


});
