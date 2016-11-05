var BooksController = require('../../../controllers/books')()

describe('Controllers: Books', function () {
  describe('Get all books: getAll()', function () {
    it('should return a list of books', function () {
      var Books = {
        findAll: td.function()
      }

      var expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z'
      }]

      td.when(Books.findAll({})).thenResolve(expectedResponse)

      var booksController = new BooksController(Books)
      return booksController.getAll()
        .then(function (response) {
          expect(response.statusCode).to.be.eql(HttpStatus.OK)
          expect(response.data).to.be.eql(expectedResponse)
        })
    })
  })

  describe('Get a book: getById()', function () {
    it('should return a books', function () {
      var Books = {
        findOne: td.function()
      }

      var expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z'
      }]

      td.when(Books.findOne({where: {id: 1}})).thenResolve(expectedResponse)

      var booksController = new BooksController(Books)
      return booksController.getById({id: 1})
        .then(function (response) {
          expect(response.statusCode).to.be.eql(HttpStatus.OK)
          expect(response.data).to.be.eql(expectedResponse)
        })
    })
  })

  describe('Create a book: create()', function () {
    it('should create a book', function () {
      var Books = {
        create: td.function()
      }

      var requestBody = {
        name: 'Test Book'
      }

      var expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z'
      }]

      td.when(Books.create(requestBody)).thenResolve(expectedResponse)

      var booksController = new BooksController(Books)
      return booksController.create(requestBody)
        .then(function (response) {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED)
          expect(response.data).to.be.eql(expectedResponse)
        })
    })
  })

  describe('Update a book: update()', function () {
    it('should update an existing book', function () {
      var Books = {
        update: td.function()
      }

      var requestBody = {
        id: 1,
        name: 'Test Book Updated'
      }

      var expectedResponse = [{
        id: 1,
        name: 'Test Book Updated',
        created_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z'
      }]

      td.when(Books.update(requestBody, {where: {id: 1}})).thenResolve(expectedResponse)

      var booksController = new BooksController(Books)
      return booksController.update(requestBody, {id: 1})
        .then(function (response) {
          expect(response.statusCode).to.be.eql(HttpStatus.OK)
          expect(response.data).to.be.eql(expectedResponse)
        })
    })
  })

  describe('Delete a book: delete()', function () {
    it('should delete an existing book', function () {
      var Books = {
        destroy: td.function()
      }

      td.when(Books.destroy({where: {id: 1}})).thenResolve({})

      var booksController = new BooksController(Books)
      return booksController.delete({id: 1})
        .then(function (response) {
          expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT)
        })
    })
  })
})
