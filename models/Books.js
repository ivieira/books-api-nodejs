module.exports = function (sequelize, DataType) {
  var Books = sequelize.define('Books', {
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
    }
  })
  return Books
}
