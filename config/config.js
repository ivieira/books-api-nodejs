module.exports = function () {
  var config = {
    database: 'books',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: `${process.env.NODE_ENV}_books.sqlite`,
      define: {
        underscored: true
      }
    }
  }

  return config
}
