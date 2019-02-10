import React, { Component } from 'react';
import styles from '../styles/ratingBreakdown.css';

class RatingBreakdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 4.7,
      star: 3,
      reviews: 1000
    };
  }

  render() {
    return (
      <div>
        <div>
          <div className={styles.scoreContainer}>
            <div className={styles.score}>{this.state.score}</div>
            <div>
              <div>{this.state.star}</div>
              <div>{this.state.reviews} Reviews</div>
            </div>
          </div>
        </div>
        Rating Breakdown
        <div>
          <div className={styles.progressBar}>
            <div>5 STARS</div>
            <progress value="50" max="100" />
          </div>
          <div className={styles.progressBar}>
            <div>4 STARS</div>
            <progress value="50" max="100" />
          </div>
          <div className={styles.progressBar}>
            <div>3 STARS</div>
            <progress value="50" max="100" />
          </div>
          <div className={styles.progressBar}>
            <div>2 STARS</div>
            <progress value="50" max="100" />
          </div>
          <div className={styles.progressBar}>
            <div>1 STARS</div>
            <progress value="50" max="100" />
          </div>
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;
