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

function UsersController (Users) {
  this.Users = Users
}

UsersController.prototype.getAll = function () {
  return this.Users.findAll({})
    .then(function (result) {
      return defaultResponse(result)
    })
    .catch(function (error) {
      return errorResponse(error.message)
    })
}

UsersController.prototype.getById = function (params) {
  return this.Users.findOne({where: params})
    .then(function (result) {
      return defaultResponse(result)
    })
    .catch(function (error) {
      return errorResponse(error.message)
    })
}

UsersController.prototype.create = function (data) {
  return this.Users.create(data)
    .then(function (result) {
      return defaultResponse(result, HttpStatus.CREATED)
    })
    .catch(function (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    })
}

UsersController.prototype.update = function (data, params) {
  return this.Users.update(data, {where: params})
    .then(function (result) {
      return defaultResponse(result)
    })
    .catch(function (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    })
}

UsersController.prototype.delete = function (params) {
  return this.Users.destroy({where: params})
    .then(function (result) {
      return defaultResponse(result, HttpStatus.NO_CONTENT)
    })
    .catch(function (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    })
}

module.exports = function () {
  return UsersController
}
