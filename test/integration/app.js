describe('Routes Books', function () {
  var Books = app.datasource.models.Books

  var defaultBook = {
    id: 1,
    name: 'Default Book'
  }

  beforeEach(function (done) {
    Books
    .destroy({where: {}})
    .then(function () {
      Books.create(defaultBook)
      .then(function () {
        done()
      })
    })
  })

  describe('Route GET /books', function () {
    it('should return a list of books', function (done) {
      request
      .get('/books')
      .end(function (err, res) {
        expect(res.body[0].id).to.be.eql(defaultBook.id)
        expect(res.body[0].name).to.be.eql(defaultBook.name)
        done(err)
      })
    })
  })

  describe('Route GET /books/{id}', function () {
    it('should return a book', function (done) {
      request
      .get('/books/1')
      .end(function (err, res) {
        expect(res.body.id).to.be.eql(defaultBook.id)
        expect(res.body.name).to.be.eql(defaultBook.name)
        done(err)
      })
    })
  })

  describe('Route POST /books', function () {
    it('should create a book', function (done) {
      var newBook = {
        id: 2,
        name: 'New Book'
      }

      request
      .post('/books')
      .send(newBook)
      .end(function (err, res) {
        expect(res.body.id).to.be.eql(newBook.id)
        expect(res.body.name).to.be.eql(newBook.name)
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
      .end(function (err, res) {
        expect(res.statusCode).to.be.eql(204)
        done(err)
      })
    })
  })
})
