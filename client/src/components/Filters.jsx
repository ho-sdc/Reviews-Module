import React from 'react';
import styles from '../styles/filters.css';

const Filters = props => {
  return (
    <div>
      <div className={styles.filterButtons}>
        <div className={styles.relevant}>RELEVANT</div>
        <div className={styles.helpful}>HELPFUL</div>
        <div className={styles.newest}>NEWEST</div>
      </div>
    </div>
  );
};
export default Filters;
