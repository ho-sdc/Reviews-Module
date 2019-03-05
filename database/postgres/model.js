const sequelize = require('./index.js');
const Sequelize = require('sequelize')

const Reviews = sequelize.define('reviews', {
    reviewid: {type: Sequelize.INTEGER},
    username: { type: Sequelize.STRING},
    header: { type: Sequelize.STRING},
    description: { type: Sequelize.STRING},
    date: { type: Sequelize.STRING},
    rating: { type: Sequelize.STRING},
    size: { type: Sequelize.STRING},
    width: { type: Sequelize.STRING},
    comfort: { type: Sequelize.STRING},
    quality: { type: Sequelize.STRING},
    recommended: { type: Sequelize.STRING},
    yes: { type: Sequelize.STRING},
    nope: { type: Sequelize.STRING},

}, {timestamps: false});

Reviews.sync({ force: false })

module.exports = Reviews;