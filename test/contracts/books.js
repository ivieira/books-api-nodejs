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
      var booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      }))

      request
      .get('/books')
      .end(function (err, res) {
        joiAssert(res.body, booksList)
        done(err)
      })
    })
  })

  describe('Route GET /books/{id}', function () {
    it('should return a book', function (done) {
      var book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      })

      request
      .get('/books/1')
      .end(function (err, res) {
        joiAssert(res.body, book)
        done(err)
      })
    })
  })

  describe('Route POST /books', function () {
    it('should create a book', function (done) {
      var book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      })

      var newBook = {
        id: 2,
        name: 'New Book'
      }

      request
      .post('/books')
      .send(newBook)
      .end(function (err, res) {
        joiAssert(res.body, book)
        done(err)
      })
    })
  })

  describe('Route PUT /books/{id}', function () {
    it('should update a book', function (done) {
      var updateCount = Joi.array().items(1)

      var updatedBook = {
        id: 1,
        name: 'Updated Book'
      }

      request
      .put('/books/1')
      .send(updatedBook)
      .end(function (err, res) {
        joiAssert(res.body, updateCount)
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
