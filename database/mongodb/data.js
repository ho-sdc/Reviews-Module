const db = require('./model.js');
const faker = require('faker');
const fs = require('fs')

const {
  descriptionGenerator,
  headerGenerator,
  fiveStarGenerator,
  dateGenerator,
  recommendGen,
  helpfulCountGen
} = require('./generator.js');

generateReviews = () => {
  let reviews = [];
  for (let i = 0; i < Math.max(Math.floor(Math.random()*15), 5); i++) {
    let review = {
      user: faker.internet.userName(),
      header: headerGenerator(),
      description: descriptionGenerator(),
      date: dateGenerator(),
      rating: fiveStarGenerator(),
      size: fiveStarGenerator(),
      width: fiveStarGenerator(),
      comfort: fiveStarGenerator(),
      quality: fiveStarGenerator(),
      recommended: recommendGen(),
      yes: helpfulCountGen(),
      nope: helpfulCountGen()
    };
    reviews.push(review);
    // reviews.push(review);
  }
  return reviews;
};

for ( let x = 0 ; x < 1; x++) {
  let writeStream = fs.createWriteStream(`./dataSet/data.csv`)
  
  function writeTenMillion(writer, data, callback) {
    let i = 10000000
    let j = 0
    function write () {
      let ok = true;
      do {
        i--;
        j++;
        let store = JSON.stringify({productId: j, productName: faker.commerce.product() + j, reviews: data()})
        if ( i === 0 ){
          writer.write( store, callback);
        } else {
          ok = writer.write(store);
        }
      } while (i > 0 && ok);
      if (i > 0){
        writer.once('drain', write)
      }
    }
    write()
  }
  
  writeTenMillion(writeStream, generateReviews, (err) => {
    if (err) {
      console.log('err')
    } else {
      console.log('done')
    }
  })

}

// generateReviews(500);

// const insertData = () => db.insertMany(reviews);
// insertData();
