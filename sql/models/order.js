'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Product, Order}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
      this.belongsTo(Product, {foreignKey: 'productId'})
    }
  };
  Order.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};