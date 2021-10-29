const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  qty: {
      type: DataTypes.INTEGER
  } 
});

module.exports = CartItem;