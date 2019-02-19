const express = require('express');
const path = require('path');
const parser = require('body-parser');

const port = 3000;
const app = express();

const Reviews = require('../database/model.js');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`Listening on port ${port}.`));

app.get('/reviews/:review_id', (req, res) => {
  let { review_id } = req.params;
  Reviews.find({ review_id })
    .sort({ review_id: 1 })
    .limit(2)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});

app.get('/reviews/:review_id/stats', (req, res) => {
  let { review_id } = req.params;
  Reviews.find({ review_id })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).end(error));
});

app.get('/reviews/:review_id/total', (req, res) => {
  let { review_id } = req.params;
  Reviews.find({ review_id })
    .countDocuments()
    .then(data => res.status(200).send(data.toString()))
    .catch(error => res.status(404).end(error));
});

app.get('/reviews/:review_id/helpful/:n', (req, res) => {
  let { review_id, n } = req.params;
  Reviews.find({ review_id })
    .$where('this.yes > this.nope')
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});

app.get('/reviews/:review_id/relevant/:n', (req, res) => {
  let { review_id, n } = req.params;
  Reviews.find({ review_id })
    .$where('this.yes + this.nope >= 110')
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});

app.get('/reviews/:review_id/newest/:n', (req, res) => {
  let { review_id, n } = req.params;
  Reviews.find({ review_id })
    .sort({ date: -1 })
    .limit(JSON.parse(n))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});

app.get('/reviews/:review_id/more', (req, res) => {
  let { review_id } = req.params;
  Reviews.find({ review_id })
    .limit(5)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});
