const Sequelize = require('sequelize');
const sequelize = new Sequelize('reviews', 'xleung', '', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(() => { console.log('connected to db: postgres') })
  .catch(() => { console.log('unable to connect to db: postgres') })

module.exports = sequelize;