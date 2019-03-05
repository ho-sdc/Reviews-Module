const db = require('./model.js')
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

generateReviews = (n) => {
  let reviews = "";
  for (let i = 0; i < Math.max(Math.floor(Math.random()*15), 5); i++) {
      let reviewid = n;
      let userName = faker.internet.userName()
      let header = headerGenerator()
      let description = descriptionGenerator()
      let date = dateGenerator()
      let rating = fiveStarGenerator()
      let size = fiveStarGenerator()
      let width = fiveStarGenerator()
      let comfort = fiveStarGenerator()
      let quality = fiveStarGenerator()
      let recommended = recommendGen()
      let yes = helpfulCountGen()
      let nope = helpfulCountGen()
    
    reviews += `${reviewid},${userName},${header},${description},${date},${rating},${size},${width},${comfort},${quality},${recommended},${yes},${nope}\n`;
  };
  return reviews;
};

let writeStream = fs.createWriteStream(`./data/data2.csv`)

function writeTenMillion(writer, data, callback) {
  let i = 10000000
  let j = 0;
  function write () {
    let ok = true;
    do {
      i--;
      j++;
      let store = data(j);
      if ( i === 0 ){
        writer.write(store, callback);
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

// writeTenMillion(writeStream, generateReviews, (err) => {
//   if (err) {
//     console.log('err')
//   } else {
//     console.log('done')
//   }
// })


