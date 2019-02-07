const loremIpsum = require('lorem-ipsum');

let descriptionGenerator = () => {
  return loremIpsum({
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 10,
    sentenceUpperBound: 20,
    paragraphLowerBound: 15,
    paragraphUpperBound: 20
  });
};

let headerGenerator = () => {
  return loremIpsum({
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    paragraphLowerBound: 5,
    paragraphUpperBound: 10
  });
};

let idGenerator = number => {
  return Math.floor(Math.random() * Math.floor(number) + 1);
};

let fiveStarGenerator = () => {
  return Math.floor(Math.random() * Math.floor(5) + 1);
};

let dateGenerator = () => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let days = [...Array(32).keys()].slice(1);
  let years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

  let getItem = array => array[Math.floor(Math.random() * array.length)];
  return `${getItem(months)} ${getItem(days)}, ${getItem(years)}`;
};

let recommendGen = () => {
  return Math.random() >= 0.5;
};

module.exports = {
  descriptionGenerator,
  headerGenerator,
  idGenerator,
  fiveStarGenerator,
  dateGenerator,
  recommendGen
};
