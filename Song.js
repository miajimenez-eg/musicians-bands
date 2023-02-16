const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Song = sequelize.define('song', {
    title: Sequelize.STRING,
    year: Sequelize.NUMBER
});

module.exports = {
    Song
};