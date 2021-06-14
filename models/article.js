const Sequelize = require('sequelize');

module.exports = class Article extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
    }, {
        sequelize,
        timestamps: true,
        underscore: false,
        modelName: 'Article',
        tableName: 'Articles',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
  }
  static associate(db) {
    db.Article.belongsTo(db.User);
  }
};