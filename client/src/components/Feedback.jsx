import React, { Component } from 'react';
import styles from '../styles/feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeAvg: 0,
      widthAvg: 0,
      comfortAvg: 0,
      qualityAvg: 0,
      length: 0
    };
  }

  componentWillReceiveProps() {
    this.getter();
  }

  getter() {
    let { size, width, comfort, quality } = this.props;
    let sizeAvg = Math.floor((size / 5) * 100);
    let widthAvg = Math.floor((width / 5) * 100);
    let comfortAvg = Math.floor((comfort / 5) * 100);
    let qualityAvg = Math.floor((quality / 5) * 100);
    let length = document.getElementById('container').clientWidth;

    this.setState({ sizeAvg, widthAvg, comfortAvg, qualityAvg, length });
  }

  conversion(average, length) {
    let pixel = Math.floor((average * length) / 100);
    return pixel;
  }

  render() {
    let { sizeAvg, widthAvg, comfortAvg, qualityAvg, length } = this.state;
    return (
      <div>
        <div className={styles.percentage}>{this.props.percentage}%</div>
        <div className={styles.description}>
          of customers recommend this product
        </div>
        <br />
        <div id="container" className={styles.container}>
          <div className={styles.meter} />
          <div className={styles.meter} />
          <div className={styles.meter} />
          <div className={styles.meter} />
        </div>
        <div
          className={styles.triangle}
          style={{ left: this.conversion(sizeAvg, length) }}
        />
      </div>
    );
  }
}

export default Feedback;
