import React, { Component } from 'react';
import Reviews from './Reviews.jsx';
import Filters from './Filters.jsx';
import Feedback from './Feedback.jsx';
import Buttons from './Buttons.jsx';
import styles from '../styles/app.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      reviewsOnDisplay: 2,
      reviews: []
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
      .then(({ data }) => this.setState({ reviews: data }))
      .then(() => this.setState({ id }))
      .catch(error => console.error(error));
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
    let { id, reviews } = this.state;
    let reviewsOnDisplay = reviews.length;
    axios
      .get(`/reviews/${id}/more`)
      .then(({ data }) => this.setState({ reviews: [...reviews, ...data] }))
      .then(() => this.setState({ reviewsOnDisplay }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.ratingsAndReviews}>RATINGS & REVIEWS</div>
        <div className={styles.row}>
          <div className={styles.leftContainer}>
            <RatingBreakdown id={this.state.id} reviews={this.state.reviews} />
            <Feedback reviews={this.state.reviews} />
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
