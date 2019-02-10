import React, { Component } from 'react';
import Reviews from './Reviews.jsx';
import Filter from './Filter.jsx';
import styles from '../styles/app.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      ratings: []
    };
    this.getRatings = this.getRatings.bind(this);
  }

  componentDidMount() {
    this.fetchReviews(Math.floor(Math.random() * 20) + 1);
  }

  fetchReviews(id) {
    axios
      .get(`/reviews/${id}`)
      .then(({ data }) => this.setState({ reviews: data }))
      .then(() => this.getRatings(this.state.reviews))
      .catch(error => console.error(error));
  }

  getRatings(reviews) {
    let ratings = reviews.map(review => review.rating);
    //console.log('results', ratings);
  }

  render() {
    return (
      <div>
        <div className={styles.ratingsAndReviews}>RATINGS & REVIEWS</div>
        <div className={styles.columns}>
          <RatingBreakdown />
          <div>
            <div>SORT ON</div>
            <Filter />
            <Reviews reviews={this.state.reviews} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
