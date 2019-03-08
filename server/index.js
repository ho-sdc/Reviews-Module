const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');

const port = 3003;
const app = express();

const Reviews = require('../database/mongodb/model.js');
// const Reviews = require('../database/postgres/model.js')

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}.`));

app.get('/reviews/:id', (req, res) => {
  let { id } = req.params;
  console.time('get')
  Reviews.find({ productId: id })
    .then(data => 
      {
        console.timeEnd('get')
        res.status(200).send(data)
      })
    .catch(error => res.status(404).send(error));
});

app.post('/reviews', (req, res) => {
  let data = req.body
  console.log(req.body)
  console.time('post')
  new Reviews({
    productId: data.productId,
    reviews: data.reviews
  }).save()
  .then(() => {
    console.timeEnd('post')
    res.status(201).send()
  })
  .catch(() => {res.status(404).send()})
})

app.delete('/reviews', (req, res) => {
  let { id } = req.query
  console.time('delete')
  Reviews.deleteOne({ productId: id })
  .then(() => { 
    console.timeEnd('delete')
    res.status(204).send()
  })
  .catch(() => { res.status(404).send() })
})

app.patch('/reviews', (req, res) => {
  let { id } = req.query
  let data = req.body;
  console.log(data.reviews)  
  console.log(id)
  console.time('update')
  Reviews.updateOne( {productId: id} , { reviews: data.reviews} )
  .then(() => {
    console.timeEnd('update')
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
