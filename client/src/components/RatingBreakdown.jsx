import React, { Component } from 'react';
import styles from '../styles/ratingBreakdown.css';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import _ from 'lodash';

class RatingBreakdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      max: 0,
      count: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0
    };
  }

  componentWillReceiveProps() {
    this.fetchReviewCount();
    this.meter();
    this.calculateAverage();
  }

  fetchReviewCount() {
    axios
      .get(`/reviews/${this.props.id}/total`)
      .then(({ data }) => this.setState({ count: data }))
      .catch(error => console.error(error));
  }

  filterReviewScores(n, array) {
    let ratings = array.filter(number => number === n);
    return ratings.length;
  }

  calculateAverage() {
    let ratings = this.props.reviews.map(review => review.rating);
    let numberOfRatings = ratings.length;
    let sum = _.sum(ratings);
    let score = sum / numberOfRatings;
    if (isNaN(score)) return 0;
    this.setState({ score });
  }

  meter() {
    let ratings = this.props.reviews.map(review => review.rating);
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
      <div>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>{this.state.score}</div>
          <div className={styles.subScore}>
            <StarRatings
              rating={this.state.score}
              starDimension="12px"
              starSpacing="0.1px"
              starRatedColor="black"
            />
            <div className={styles.reviews}>
              <div className={styles.reviewsNumber}>{this.state.count}</div>
              <div className={styles.reviewsTag}>Reviews</div>
            </div>
          </div>
        </div>
        <div className={styles.ratingBreakdown}>RATING BREAKDOWN</div>
        <div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>5 STARS</div>
            <progress value={this.state.five} max={this.state.max} />
            <div className={styles.numOfReviews}>{this.state.five}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>4 STARS</div>
            <progress value={this.state.four} max={this.state.max} />
            <div className={styles.numOfReviews}>{this.state.four}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>3 STARS</div>
            <progress value={this.state.three} max={this.state.max} />
            <div className={styles.numOfReviews}>{this.state.three}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>2 STARS</div>
            <progress value={this.state.two} max={this.state.max} />
            <div className={styles.numOfReviews}>{this.state.two}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>1 STARS</div>
            <progress value={this.state.one} max={this.state.max} />
            <div className={styles.numOfReviews}>{this.state.one}</div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default RatingBreakdown;
