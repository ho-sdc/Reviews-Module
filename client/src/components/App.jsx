import React, { Component } from 'react';
import Reviews from './Reviews.jsx';
import Filters from './Filters.jsx';
import styles from '../styles/app.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      score: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      max: 0
    };
  }

  componentDidMount() {
    this.fetchReviews(Math.floor(Math.random() * 20) + 1);
  }

  fetchReviews(id) {
    axios
      .get(`/reviews/${id}`)
      .then(({ data }) => this.setState({ reviews: data }))
      .then(() => this.calculateAverage())
      .then(() => this.meter())
      .catch(error => console.error(error));
  }

  calculateAverage() {
    let ratings = this.state.reviews.map(review => review.rating);
    let numberOfRatings = ratings.length;
    let getSum = (acc, val) => acc + val;
    let sum = ratings.reduce(getSum);
    let avg = sum / numberOfRatings;
    this.setState({ score: avg });
  }

  filterReviewScores(n, array) {
    let ratings = array.filter(number => number === n);
    return ratings.length;
  }

  meter() {
    let ratings = this.state.reviews.map(review => review.rating);
    let five = this.filterReviewScores(5, ratings);
    let four = this.filterReviewScores(4, ratings);
    let three = this.filterReviewScores(3, ratings);
    let two = this.filterReviewScores(2, ratings);
    let one = this.filterReviewScores(1, ratings);
    let max = five + four + three + two + one;
    this.setState({ five, four, three, two, one, max });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.ratingsAndReviews}>RATINGS & REVIEWS</div>
        <div className={styles.columns}>
          <RatingBreakdown
            reviews={this.state.reviews}
            score={this.state.score}
            five={this.state.five}
            four={this.state.four}
            three={this.state.three}
            two={this.state.two}
            one={this.state.one}
            max={this.state.max}
          />
          <div>
            <div className={styles.sortOn}>SORT ON</div>
            <Filters />
            <Reviews reviews={this.state.reviews} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
