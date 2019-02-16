import React, { Component } from 'react';
import Reviews from './Reviews.jsx';
import Filters from './Filters.jsx';
import Feedback from './Feedback.jsx';
import Buttons from './Buttons.jsx';
import styles from '../styles/app.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import axios from 'axios';

let id = Math.floor(Math.random() * 20) + 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      count: 0,
      reviewsOnDisplay: 2,
      reviews: [],
      stats: [],
      n: 0,
      percentage: 0,
      score: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      max: 0,
      size: 0,
      width: 0,
      comfort: 0,
      quality: 0
    };
    this.filterByRelevant = this.filterByRelevant.bind(this);
    this.filterByHelpful = this.filterByHelpful.bind(this);
    this.filterByNewest = this.filterByNewest.bind(this);
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
  }

  componentDidMount() {
    this.onStartUp(id);
  }

  onStartUp(id) {
    axios
      .get(`/reviews/${id}`)
      .then(({ data }) => this.setState({ reviews: data }))
      .then(() => this.fetchStats(id))
      .then(() => this.fetchReviewCount(id))
      .then(() => this.calculateAverage())
      .then(() => this.meter())
      .then(() => this.calculateRecommendations())
      .then(() => this.userFeedback())
      .then(() => this.setState({ id }))
      .catch(error => console.error(error));
  }

  fetchReviewCount(id) {
    axios
      .get(`/reviews/${id}/total`)
      .then(({ data }) => this.setState({ count: data }))
      .catch(error => console.error(error));
  }

  fetchStats(id) {
    axios
      .get(`/reviews/${id}/stats`)
      .then(({ data }) => this.setState({ stats: data }))
      .then(error => console.error(error));
  }

  calculateAverage() {
    let ratings = this.state.reviews.map(review => review.rating);
    let numberOfRatings = ratings.length;
    let getSum = (acc, val) => acc + val;
    let sum = ratings.reduce(getSum);
    let avg = sum / numberOfRatings;
    this.setState({ score: avg });
  }

  calculateRecommendations() {
    let recommendations = this.state.reviews.map(review => review.recommended);
    let total = recommendations.length;
    let yes = 0;

    recommendations.forEach(recommendation => {
      if (recommendation === true) yes++;
    });

    let percentage = (yes / total) * 100;
    this.setState({ percentage });
  }

  filterReviewScores(n, array) {
    let ratings = array.filter(number => number === n);
    return ratings.length;
  }

  filterByRelevant() {
    let { id, reviewsOnDisplay } = this.state;
    axios
      .get(`/reviews/${id}/relevant/${reviewsOnDisplay}`)
      .then(({ data }) => this.setState({ reviews: data }))
      .catch(error => console.error(error));
  }

  filterByHelpful() {
    let { id, reviewsOnDisplay } = this.state;
    axios
      .get(`/reviews/${id}/helpful/${reviewsOnDisplay}`)
      .then(({ data }) => this.setState({ reviews: data }))
      .catch(error => console.error(error));
  }

  filterByNewest() {
    let { id, reviewsOnDisplay } = this.state;
    axios
      .get(`/reviews/${id}/newest/${reviewsOnDisplay}`)
      .then(({ data }) => this.setState({ reviews: data }))
      .catch(error => console.error(error));
  }

  loadMoreReviews() {
    axios
      .get(`/reviews/${id}/more`)
      .then(({ data }) =>
        this.setState({ reviews: [...this.state.reviews, ...data] })
      )
      .then(() =>
        this.setState({ reviewsOnDisplay: this.state.reviews.length })
      )
      .catch(error => console.error(error));
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

  userFeedback() {
    let { reviews } = this.state;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let n = reviews.length;

    let size = reviews.map(review => review.size).reduce(reducer) / n;
    let width = reviews.map(review => review.width).reduce(reducer) / n;
    let comfort = reviews.map(review => review.comfort).reduce(reducer) / n;
    let quality = reviews.map(review => review.quality).reduce(reducer) / n;

    this.setState({ size, width, comfort, quality, n });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.ratingsAndReviews}>RATINGS & REVIEWS</div>
        <div className={styles.row}>
          <div className={styles.leftContainer}>
            <RatingBreakdown
              count={this.state.count}
              score={this.state.score}
              five={this.state.five}
              four={this.state.four}
              three={this.state.three}
              two={this.state.two}
              one={this.state.one}
              max={this.state.max}
            />
            <Feedback
              percentage={this.state.percentage}
              size={this.state.size}
              width={this.state.width}
              comfort={this.state.comfort}
              quality={this.state.quality}
              n={this.state.n}
            />
          </div>
          <div>
            <div className={styles.sortOn}>SORT ON</div>
            <Filters
              filterByHelpful={this.filterByHelpful}
              filterByRelevant={this.filterByRelevant}
              filterByNewest={this.filterByNewest}
            />
            <Reviews reviews={this.state.reviews} />
            <Buttons loadMoreReviews={this.loadMoreReviews} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
