import React, { Component } from 'react';
import Reviews from './Reviews.jsx';
import Filters from './Filters.jsx';
import Feedback from './Feedback.jsx';
import Buttons from './Buttons.jsx';
import styles from '../styles/app.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import axios from 'axios';

// let id = Math.floor(Math.random() * 20) + 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      reviewsOnDisplay: 2,
      reviews: [],
      stats: [],
      n: 0,
      percentage: 0,
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
    this.onStartUp(Math.floor(Math.random() * 20) + 1);
  }

  onStartUp(id) {
    axios
      .get(`/reviews/${id}`)
      .then(({ data }) => this.setState({ reviews: data, id }))
      .then(() => this.calculatePercentage())
      .then(() => this.userFeedback())
      .catch(error => console.error(error));
  }

  calculatePercentage() {
    let recommendations = this.state.reviews.map(review => review.recommended);
    let total = recommendations.length;
    let count = 0;

    recommendations.forEach(recommendation => {
      if (recommendation === true) count++;
    });

    let percentage = (count / total) * 100;
    this.setState({ percentage });
  }

  //////////////////USER FEEDBACK ////////////////////////////////////
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
  //////////////////USER FEEDBACK ////////////////////////////////////

  /////////////////// FILTERS ///////////////////////////////////////
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

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.ratingsAndReviews}>RATINGS & REVIEWS</div>
        <div className={styles.row}>
          <div className={styles.leftContainer}>
            <RatingBreakdown id={this.state.id} reviews={this.state.reviews} />
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
