var bcrypt = require('bcrypt')

module.exports = function (sequelize, DataType) {
  return sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
    {
      hooks: {
        beforeCreate: function (user, options) {
          var salt = bcrypt.genSaltSync()
          user.set('password', bcrypt.hashSync(user.password, salt))
        }
      },
      classMethods: {
        isPassword: function (encodedPassword, password) {
          return bcrypt.compareSync(password, encodedPassword)
        }
      }
    })
}
