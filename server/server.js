require('newrelic')
const express = require('express');
const path = require('path');
const parser = require('body-parser'); 
const cors = require('cors');
const controller = require('./controller.js');
const app = express();
const redisClient = require('redis').createClient;
const redis = redisClient(6379, '52.53.182.206');


const Reviews = require('../database/mongodb/model.js');
// const Reviews = require('../database/postgres/model.js')

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());


app.get('/reviews/:id', (req, res) => {
  let { id } = req.params;
  controller.fetchReviews(Reviews, redis, id, (error, data) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.status(200).send(data[0])
    }
  })
});

app.post('/reviews/:id', (req, res) => {
  let data = req.body
  new Reviews({
    productId: data.productId,
    reviews: data.reviews
  }).save()
  .then(() => {
    res.status(201).send()
  })
  .catch(() => {res.status(404).send()})
})

app.delete('/reviews', (req, res) => {
  let { id } = req.query
  Reviews.deleteOne({productId: id})
  .then(() => { 
    res.status(204).send()
  })
  .catch(() => { res.status(404).send() })
})

app.patch('/reviews', (req, res) => {
  let { id } = req.query
  let data = req.body;
  Reviews.updateOne( {productId: id} , { reviews: data.reviews} )
  .then(() => {
    res.status(204).send()
  })
  .catch(() => {res.status(404).send()})
})

// postgres get request
// app.get('/reviews/:id', (req, res) => {
//   let { id } = req.params;
//   console.log('reached req', id)
//   console.time('reviews')
//   Reviews.findAll({ where: {reviewid: id} })
//     .then(data => 
//       {
//         console.timeEnd('reviews')
//         res.status(200).send(data)
//       })
//     .catch(error => res.status(404).send(error));
// });

module.exports = app;