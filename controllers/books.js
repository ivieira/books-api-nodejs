var HttpStatus = require('http-status')

function defaultResponse (data, statusCode = HttpStatus.OK) {
  return {
    data: data,
    statusCode: statusCode
  }
}

function errorResponse (message, statusCode = HttpStatus.BAD_REQUEST) {
  return defaultResponse({error: message}, statusCode)
}

function BooksController (Books) {
  this.Books = Books
}

BooksController.prototype.getAll = function () {
  return this.Books.findAll({})
    .then(function (result) {
      return defaultResponse(result)
    })
    .catch(function (error) {
      return errorResponse(error.message)
    })
}

BooksController.prototype.getById = function (params) {
  return this.Books.findOne({where: params})
    .then(function (result) {
      return defaultResponse(result)
    })
    .catch(function (error) {
      return errorResponse(error.message)
    })
}

BooksController.prototype.create = function (data) {
  return this.Books.create(data)
    .then(function (result) {
      return defaultResponse(result, HttpStatus.CREATED)
    })
    .catch(function (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    })
}

BooksController.prototype.update = function (data, params) {
  return this.Books.update(data, {where: params})
    .then(function (result) {
      return defaultResponse(result)
    })
    .catch(function (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    })
}

BooksController.prototype.delete = function (params) {
  return this.Books.destroy({where: params})
    .then(function (result) {
      return defaultResponse(result, HttpStatus.NO_CONTENT)
    })
    .catch(function (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    })
}

module.exports = function () {
  return BooksController
}
