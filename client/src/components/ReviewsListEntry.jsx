import React from 'react';
import StarRatings from 'react-star-ratings';
import styles from '../styles/reviewListEntry.css';

const ReviewsListEntry = props => {
  return (
    <div>
      <div className={styles.feedTop}>
        <StarRatings
          rating={props.review.rating}
          starDimension="14px"
          starSpacing="0.1px"
          starRatedColor="black"
        />
        <div className={styles.date}>{props.review.review_date}</div>
      </div>
      <div className={styles.header}>{props.review.header}</div>
      <br />
      <div>{props.review.description}</div>
      <br />
      <div>{props.review.user} - Verified Purchaser</div>
      <br />
      <div className={styles.bottomEntry}>
        <div>Reply</div>
        <div>Was this review helpful? Yes (0) No (0)</div>
      </div>
      <hr />
    </div>
  );
};

export default ReviewsListEntry;
