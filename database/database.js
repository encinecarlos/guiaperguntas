const sequelize = require('sequelize');

const commection = new sequelize('questionbase', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = commection;