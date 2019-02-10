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

app.get('/reviews', (req, res) => {
  Reviews.find()
    .sort({ review_id: 1 })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});

app.get('/reviews/:review_id', (req, res) => {
  let { review_id } = req.params;
  Reviews.find({ review_id })
    .sort({ review_id: 1 })
    .limit(10)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error));
});
