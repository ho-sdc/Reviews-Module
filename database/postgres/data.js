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

generateReviews = () => {
  let reviews = "";
  // for (let i = 0; i < Math.max(Math.floor(Math.random()*15), 5); i++) {
    let review = '"{' +
      '""user"":' + faker.internet.userName() + ',' +
      '""header"":' + headerGenerator() + ',' +
      '""description"":' + descriptionGenerator() + ',' +
      '""date"":' + dateGenerator() + ',' +
      '""rating"":' + fiveStarGenerator() + ',' +
      '""size"":' + fiveStarGenerator() + ',' +
      '""width"":' + fiveStarGenerator() + ',' +
      '""comfort"":' + fiveStarGenerator() + ',' +
      '""quality"":' + fiveStarGenerator() + ',' +
      '""recommended"":' + recommendGen() + ',' +
      '""yes"":' + helpfulCountGen() + ',' +
      '""nope"":' + helpfulCountGen() + 
      '}"';
    reviews += review + ',';
  // };
  return '"{' + reviews.slice(0, reviews.length-1) + '}"';
};

console.log(generateReviews())

for ( let x = 0 ; x < 1; x++) {
  let writeStream = fs.createWriteStream(`./data/data.csv`)
  
  function writeTenMillion(writer, data, callback) {
    let i = 1
    let j = 0
    function write () {
      let ok = true;
      do {
        i--;
        j++;
        let store = data() + '\n';
        console.log(store);
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
  
  writeTenMillion(writeStream, generateReviews, (err) => {
    if (err) {
      console.log('err')
    } else {
      console.log('done')
    }
  })

}