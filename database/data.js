const db = require('./model.js');

const {
  descriptionGenerator,
  headerGenerator,
  idGenerator,
  fiveStarGenerator,
  dateGenerator,
  recommendGen
} = require('./generator.js');

let reviews = [];

generateReviews = n => {
  for (let i = 0; i < n; i++) {
    let review = {
      review_id: idGenerator(20),
      header: headerGenerator(),
      description: descriptionGenerator(),
      review_date: dateGenerator(),
      rating: fiveStarGenerator(),
      size: fiveStarGenerator(),
      width: fiveStarGenerator(),
      comfort: fiveStarGenerator(),
      quality: fiveStarGenerator(),
      recommended: recommendGen()
    };
    reviews.push(review);
  }
};

generateReviews(500);

const insertData = () => db.insertMany(reviews);
insertData();
