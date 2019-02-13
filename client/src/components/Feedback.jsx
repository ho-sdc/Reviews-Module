import React, { Component } from 'react';
import styles from '../styles/feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.percentage}>{this.props.percentage}%</div>
        <div className={styles.description}>
          of customers recommend this product
        </div>
      </div>
    );
  }
}

export default Feedback;
