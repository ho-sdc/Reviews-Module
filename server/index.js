const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');

const port = 3003;
const app = express();

const Reviews = require('../database/model.js');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}.`));

app.get('/reviews', (req, res) => {
  let { id } = req.query;
  console.log('reached req', id)
  Reviews.find({ productId: id })
    .limit(2)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});

app.get('/reviews/stats', (req, res) => {
  let { id } = req.query;
  Reviews.find({ productId: id })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).end(error));
});

app.get('/reviews/:productId/helpful/:n', (req, res) => {
  let { productId, n } = req.params;
  Reviews.find({ productId })
    .$where('this.yes > this.nope')
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).end(error));
});

app.get('/reviews/:productId/relevant/:n', (req, res) => {
  let { productId, n } = req.params;
  Reviews.find({ productId })
    .$where('this.yes + this.nope >= 110')
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).end(error));
});

app.get('/reviews/:productId/newest/:n', (req, res) => {
  let { productId, n } = req.params;
  Reviews.find({ productId })
    .sort({ date: -1 })
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).end(error));
});

app.post('/reviews/:productId/stars/:n', (req, res) => {
  let { productId, n } = req.params;
  let { stars } = req.body;
  let parsedStars = stars.sort();

  let min = parsedStars[0];
  let max = parsedStars[parsedStars.length - 1];

  Reviews.find({})
    .where('productId')
    .equals(productId)
    .where('rating')
    .gte(min)
    .lte(max)
    .sort({ rating: -1 })
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).end(error));
});

app.get('/reviews/:productId/more', (req, res) => {
  let { productId } = req.params;
  Reviews.find({ productId })
    .limit(5)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});
