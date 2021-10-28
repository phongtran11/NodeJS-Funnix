const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'nodejs', 'root', '020899Pi',
    {
        dialect: 'mysql',
        host: 'localhost',
    });

module.exports = sequelize;