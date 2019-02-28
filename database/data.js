const db = require('./model.js');
const faker = require('faker');
// const {Writable} = require('stream'); 
const fs = require('fs')

const {
  descriptionGenerator,
  headerGenerator,
  idGenerator,
  fiveStarGenerator,
  dateGenerator,
  recommendGen,
  helpfulCountGen
} = require('./generator.js');

let reviews = [];

generateReviews = n => {
  for (let i = 0; i < n; i++) {
    let review = {
      review_id: idGenerator(20),
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
    // reviews.push(review);
    return review;
  }
};

for ( let x = 0 ; x < 1; x++) {
  let writeStream = fs.createWriteStream(`./dataSet/data.csv`)
  
  function writeTenMillion(writer, callback) {
    let i = 10000000
    function write () {
      let ok = true;
      do {
        i--;
        if ( i === 0 ){
          writer.write( JSON.stringify(generateReviews(1)), callback);
        } else {
          ok = writer.write(JSON.stringify(generateReviews(1)));
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
