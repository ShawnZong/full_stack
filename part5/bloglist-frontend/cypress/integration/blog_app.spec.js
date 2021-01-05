import { func } from 'prop-types'
const firstUser = {
  username: 'aaltoUsername',
  password: 'aaltoPwd',
  name: 'aaltoName',
}
describe('Blog app', function () {
  beforeEach(function () {
    //reset user and blogs
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    //initialize a new user
    cy.request('POST', 'http://localhost:3001/api/users', firstUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      //   cy.get('#loginUsername').type(firstUser.username)
      //   cy.get('#loginPwd').type(firstUser.password)
      //   cy.get('#loginButton').click()
      cy.login({ username: firstUser.username, password: firstUser.password })
      cy.contains(`${firstUser.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#loginUsername').type(firstUser.username)
      cy.get('#loginPwd').type('wrongPwd')
      cy.get('#loginButton').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', `${firstUser.name} logged in`)
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: firstUser.username, password: firstUser.password })
    })

    it('A blog can be created', function () {
      cy.get('#showTogglable').click()
      cy.get('#title').type('titleTest')
      cy.get('#author').type('authorTest')
      cy.get('#url').type('urlTest')
      cy.get('#newBlogButton').click()

      cy.contains('titleTest')
      cy.contains('authorTest')
    })
  })
})
