const sequelize = require('../config/database');
const User = require('./user');

const db = {sequelize, User};

db.sequelize.sync({ force: false})
    .then(() => console.log('Database & tables created!'))
    .catch((err) => console.error('Error creating database: ' ,err));

module.exports = db;