import React, { Component } from 'react';
import styles from '../styles/ratingBreakdown.css';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import _ from 'lodash';

class RatingBreakdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: ['Test'],
      score: 0,
      max: 0,
      count: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      filter: false
    };
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.fetchReviewCount();
      this.meter();
      this.calculateAverage();
    }, 0);
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
    let ratings = this.props.stats.map(review => review.rating);
    let numberOfRatings = ratings.length;
    let sum = _.sum(ratings);
    let score = Math.round(10 * (sum / numberOfRatings)) / 10;
    if (isNaN(score)) return 0;
    this.setState({ score });
  }

  meter() {
    let ratings = this.props.stats.map(review => review.rating);
    let five = this.filterReviewScores(5, ratings);
    let four = this.filterReviewScores(4, ratings);
    let three = this.filterReviewScores(3, ratings);
    let two = this.filterReviewScores(2, ratings);
    let one = this.filterReviewScores(1, ratings);
    let max = five + four + three + two + one;
    this.setState({ five, four, three, two, one, max });
  }

  clickHandler() {
    this.setState({ filter: !this.state.filter });
  }

  render() {
    let { score, count, max, five, four, three, two, one } = this.state;

    return (
      <div>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>{score}</div>
          <div className={styles.subScore}>
            <StarRatings
              rating={score}
              starDimension="12px"
              starSpacing="0.1px"
              starRatedColor="black"
            />
            <div className={styles.reviews}>
              <div className={styles.reviewsNumber}>{count}</div>
              <div className={styles.reviewsTag}>Reviews</div>
            </div>
          </div>
        </div>
        <div className={styles.ratingBreakdown}>RATING BREAKDOWN</div>
        {this.state.filter ? <div>{this.state.array}</div> : null}
        <div>
          <div className={styles.progressBar}>
            <div
              className={styles.starCategory}
              onClick={() => this.clickHandler()}
            >
              5 STARS
            </div>
            <progress value={five} max={max} />
            <div className={styles.numOfReviews}>{five}</div>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.starCategory}
              onClick={() => this.clickHandler()}
            >
              4 STARS
            </div>
            <progress value={four} max={max} />
            <div className={styles.numOfReviews}>{four}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>3 STARS</div>
            <progress value={three} max={max} />
            <div className={styles.numOfReviews}>{three}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>2 STARS</div>
            <progress value={two} max={max} />
            <div className={styles.numOfReviews}>{two}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>1 STARS</div>
            <progress value={one} max={max} />
            <div className={styles.numOfReviews}>{one}</div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default RatingBreakdown;
