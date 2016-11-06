var jwt = require('jwt-simple')

describe('Routes Books', function () {
  var Books = app.datasource.models.Books
  var Users = app.datasource.models.Users
  var jwtSecret = app.config.jwtSecret

  var defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description'
  }

  var token = ''

  beforeEach(function (done) {
    Users
    .destroy({where: {}})
    .then(function () {
      Users.create({
        name: 'John',
        email: 'john@email.com',
        password: '12345'
      })
      .then(function (user) {
        Books
        .destroy({where: {}})
        .then(function () {
          Books.create(defaultBook)
          .then(function () {
            token = jwt.encode({id: user.id}, jwtSecret)
            done()
          })
        })
      })
    })
  })

  describe('Route GET /books', function () {
    it('should return a list of books', function (done) {
      request
      .get('/books')
      .set('Authorization', `JWT ${token}`)
      .end(function (err, res) {
        expect(res.body[0].id).to.be.eql(defaultBook.id)
        expect(res.body[0].name).to.be.eql(defaultBook.name)
        expect(res.body[0].description).to.be.eql(defaultBook.description)
        done(err)
      })
    })
  })

  describe('Route GET /books/{id}', function () {
    it('should return a book', function (done) {
      request
      .get('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end(function (err, res) {
        expect(res.body.id).to.be.eql(defaultBook.id)
        expect(res.body.name).to.be.eql(defaultBook.name)
        expect(res.body.description).to.be.eql(defaultBook.description)
        done(err)
      })
    })
  })

  describe('Route POST /books', function () {
    it('should create a book', function (done) {
      var newBook = {
        id: 2,
        name: 'New Book',
        description: 'New Description'
      }

      request
      .post('/books')
      .set('Authorization', `JWT ${token}`)
      .send(newBook)
      .end(function (err, res) {
        expect(res.body.id).to.be.eql(newBook.id)
        expect(res.body.name).to.be.eql(newBook.name)
        expect(res.body.description).to.be.eql(newBook.description)
        done(err)
      })
    })
  })

  describe('Route PUT /books/{id}', function () {
    it('should update a book', function (done) {
      var updatedBook = {
        id: 1,
        name: 'Updated Book'
      }

      request
      .put('/books/1')
      .set('Authorization', `JWT ${token}`)
      .send(updatedBook)
      .end(function (err, res) {
        expect(res.body).to.be.eql([1])
        done(err)
      })
    })
  })

  describe('Route DELETE /books/{id}', function () {
    it('should delet a book', function (done) {
      request
      .delete('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end(function (err, res) {
        expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT)
        done(err)
      })
    })
  })
})
