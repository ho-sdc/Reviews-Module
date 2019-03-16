const mongoose = require('mongoose');

mongoose.connect('mongodb://xleung:password@54.219.166.133/reviews');

const connection = mongoose.connection;

connection.on('error', () => console.log('Connection testing it working.'));
connection.once('open', () => console.log('Connected to mongoDB.'));

module.exports = connection;
