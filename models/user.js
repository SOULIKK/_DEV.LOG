const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nickName: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'Users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
  }
  static associate(db) {
    db.User.hasMany(db.Article);
  }
}