import React from 'react';
import styles from '../styles/filters.css';

const Filters = props => {
  return (
    <div>
      <div className={styles.filterButtons}>
        <div
          onClick={() => props.filterByRelevant()}
          className={styles.relevant}
        >
          RELEVANT
        </div>
        <div onClick={() => props.filterByHelpful()} className={styles.helpful}>
          HELPFUL
        </div>
        <div onClick={() => props.filterByNewest()} className={styles.newest}>
          NEWEST
        </div>
      </div>
    </div>
  );
};
export default Filters;
