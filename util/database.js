const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'nodejs', 'root', '020899Pi',
    {
        host: 'localhost',
        dialect: 'mysql',
    });





module.exports = sequelize;