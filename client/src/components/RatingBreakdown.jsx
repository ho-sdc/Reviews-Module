import React, { Component } from 'react';
import styles from '../styles/ratingBreakdown.css';
import StarRatings from 'react-star-ratings';

class RatingBreakdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>{this.props.score}</div>
          <div className={styles.subScore}>
            <StarRatings
              rating={this.props.score}
              starDimension="12px"
              starSpacing="0.1px"
              starRatedColor="black"
            />
            <div className={styles.reviews}>
              <div className={styles.reviewsNumber}>
                {this.props.reviews.length}
              </div>
              <div className={styles.reviewsTag}>Reviews</div>
            </div>
          </div>
        </div>
        <div className={styles.ratingBreakdown}>RATING BREAKDOWN</div>
        <div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>5 STARS</div>
            <progress value={this.props.five} max={this.props.max} />
            <div className={styles.numOfReviews}>{this.props.five}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>4 STARS</div>
            <progress value={this.props.four} max={this.props.max} />
            <div className={styles.numOfReviews}>{this.props.four}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>3 STARS</div>
            <progress value={this.props.three} max={this.props.max} />
            <div className={styles.numOfReviews}>{this.props.three}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>2 STARS</div>
            <progress value={this.props.two} max={this.props.max} />
            <div className={styles.numOfReviews}>{this.props.two}</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.starCategory}>1 STARS</div>
            <progress value={this.props.one} max={this.props.max} />
            <div className={styles.numOfReviews}>{this.props.one}</div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default RatingBreakdown;
