const user1 = {
  username: 'aaltoUsername',
  password: 'aaltoPwd',
  name: 'aaltoName',
}
const user2 = {
  username: 'aaltoUsername2',
  password: 'aaltoPwd',
  name: 'aaltoName2',
}
describe('Blog app', function () {
  beforeEach(function () {
    //reset user and blogs
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    //initialize a new user
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)

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
      cy.login({ username: user1.username, password: user1.password })
      cy.contains(`${user1.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#loginUsername').type(user1.username)
      cy.get('#loginPwd').type('wrongPwd')
      cy.get('#loginButton').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', `${user1.name} logged in`)
    })
  })

  describe.only('When logged in', function () {
    const newBlog = {
      title: 'titleTest',
      author: 'authorTest',
      url: 'urlTest',
    }
    beforeEach(function () {
      cy.login({ username: user1.username, password: user1.password })
    })

    it('A blog can be created', function () {
      cy.addNewBlog(newBlog)

      cy.contains(newBlog.title)
      cy.contains(newBlog.author)
    })

    it('user can add likes to blog', function () {
      cy.addNewBlog(newBlog)
      cy.contains('view').click()
      cy.get('#likesButton').click()

      cy.get('html').should('contain', 'likes 1')
    })

    it("user can delete own blog'", function () {
      cy.addNewBlog(newBlog)
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'titleTest authorTest')
    })
    it('user cannot delete blogs from others', function () {
      cy.addNewBlog(newBlog)
      cy.contains('logout').click()
      cy.login(user2)
      cy.addNewBlog(newBlog)
      cy.get('.blogDetail').eq(0).as('firstBlog')
      cy.get('@firstBlog').contains('view').click()

      cy.get('@firstBlog').should('not.contain', 'remove')
    })
    it('blogs are ordered according to likes', function () {
      const blog1 = {
        title: 'titleTest1',
        author: 'authorTest1',
        url: 'urlTest1',
      }
      const blog2 = {
        title: 'titleTest2',
        author: 'authorTest2',
        url: 'urlTest2',
      }
      const blog3 = {
        title: 'titleTest3',
        author: 'authorTest3',
        url: 'urlTest3',
      }
      cy.addNewBlogByAPI(blog1)
      cy.addNewBlogByAPI(blog2)
      cy.addNewBlogByAPI(blog3)
      cy.reload()

      cy.get('.blogDetail').eq(0).as('firstBlog')
      cy.get('.blogDetail').eq(1).as('secondBlog')
      cy.get('.blogDetail').eq(2).as('thirdBlog')

      cy.get('@firstBlog').contains('view').click()
      cy.get('@secondBlog').contains('view').click()
      cy.get('@thirdBlog').contains('view').click()

      for (let n = 0; n < 2; n++) {
        cy.get('@firstBlog').contains('like').click()
      }
      for (let n = 0; n < 3; n++) {
        cy.get('@secondBlog').contains('like').click()
      }
      for (let n = 0; n < 1; n++) {
        cy.get('@thirdBlog').contains('like').click()
      }
      cy.wait(1000)
      cy.reload()

      cy.get('.blogDetail').eq(0).as('updatedFirstBlog')
      cy.get('.blogDetail').eq(1).as('updatedSecondBlog')
      cy.get('.blogDetail').eq(2).as('updatedThirdBlog')

      cy.get('@updatedFirstBlog').contains('view').click()
      cy.get('@updatedSecondBlog').contains('view').click()
      cy.get('@updatedThirdBlog').contains('view').click()

      cy.get('@updatedFirstBlog').contains('titleTest2')
      cy.get('@updatedSecondBlog').contains('titleTest1')
      cy.get('@updatedThirdBlog').contains('titleTest3')
    })
  })
})
