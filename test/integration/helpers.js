var supertest = require('supertest')
var chai = require('chai')
var HttpStatus = require('http-status')
var app = require('../../app')()

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.HttpStatus = HttpStatus
