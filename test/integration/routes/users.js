describe('Routes Users', function () {
  var Users = app.datasource.models.Users
  var defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'default@email.com',
    password: 'default'
  }

  beforeEach(function (done) {
    Users
    .destroy({where: {}})
    .then(function () {
      Users.create(defaultUser)
      .then(function () {
        done()
      })
    })
  })

  describe('Route GET /users', function () {
    it('should return a list of users', function (done) {
      request
      .get('/users')
      .end(function (err, res) {
        expect(res.body[0].id).to.be.eql(defaultUser.id)
        expect(res.body[0].name).to.be.eql(defaultUser.name)
        expect(res.body[0].email).to.be.eql(defaultUser.email)
        done(err)
      })
    })
  })

  describe('Route GET /users/{id}', function () {
    it('should return a user', function (done) {
      request
      .get('/users/1')
      .end(function (err, res) {
        expect(res.body.id).to.be.eql(defaultUser.id)
        expect(res.body.name).to.be.eql(defaultUser.name)
        expect(res.body.email).to.be.eql(defaultUser.email)
        done(err)
      })
    })
  })

  describe('Route POST /users', function () {
    it('should create a user', function (done) {
      var newUser = {
        id: 2,
        name: 'New User',
        email: 'new@email.com',
        password: 'test'
      }

      request
      .post('/users')
      .send(newUser)
      .end(function (err, res) {
        expect(res.body.id).to.be.eql(newUser.id)
        expect(res.body.name).to.be.eql(newUser.name)
        expect(res.body.email).to.be.eql(newUser.email)
        done(err)
      })
    })
  })

  describe('Route PUT /users/{id}', function () {
    it('should update a user', function (done) {
      var updatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'updated@email.com'
      }

      request
      .put('/users/1')
      .send(updatedUser)
      .end(function (err, res) {
        expect(res.body).to.be.eql([1])
        done(err)
      })
    })
  })

  describe('Route DELETE /users/{id}', function () {
    it('should delet a user', function (done) {
      request
      .delete('/users/1')
      .end(function (err, res) {
        expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT)
        done(err)
      })
    })
  })
})
