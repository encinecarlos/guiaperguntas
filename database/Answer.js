const Sequelize = require('sequelize');
const Connection = require('./database');

const Answer = Connection.define('answer', {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false});

module.exports = Answer;