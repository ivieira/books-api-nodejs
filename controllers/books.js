function defaultResponse (data, statusCode) {
  return {
    data: data,
    statusCode: statusCode
  }
}

function errorResponse (message, statusCode) {
  return defaultResponse({error: message}, statusCode)
}

function BooksController (Books) {
  this.Books = Books
}

BooksController.prototype.getAll = function () {
  return this.Books.findAll({})
    .then(function (result) {
      return defaultResponse(result, 200)
    })
    .catch(function (error) {
      return errorResponse(error.message, 400)
    })
}

BooksController.prototype.getById = function (params) {
  return this.Books.findOne({where: params})
    .then(function (result) {
      return defaultResponse(result, 200)
    })
    .catch(function (error) {
      return errorResponse(error.message, 400)
    })
}

BooksController.prototype.create = function (data) {
  return this.Books.create(data)
    .then(function (result) {
      return defaultResponse(result, 201)
    })
    .catch(function (error) {
      return errorResponse(error.message, 422)
    })
}

BooksController.prototype.update = function (data, params) {
  return this.Books.update(data, {where: params})
    .then(function (result) {
      return defaultResponse(result, 200)
    })
    .catch(function (error) {
      return errorResponse(error.message, 422)
    })
}

BooksController.prototype.delete = function (params) {
  return this.Books.destroy({where: params})
    .then(function (result) {
      return defaultResponse(result, 204)
    })
    .catch(function (error) {
      return errorResponse(error.message, 422)
    })
}

module.exports = function () {
  return BooksController
}
