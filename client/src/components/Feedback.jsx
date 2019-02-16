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
        <div>
          <div className={styles.tag}>SIZE</div>
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
          <div className={styles.tag2Div}>
            <div className={styles.tag2}>TOO SMALL</div>
            <div className={styles.tag2}>PERFECT</div>
            <div className={styles.tag2}>TOO LARGE</div>
          </div>
        </div>
        <div>
          <div className={styles.tag}>WIDTH</div>
          <div id="container" className={styles.container}>
            <div className={styles.meter} />
            <div className={styles.meter} />
            <div className={styles.meter} />
            <div className={styles.meter} />
          </div>
          <div
            className={styles.triangle}
            style={{ left: this.conversion(widthAvg, length) }}
          />
          <div className={styles.tag2Div}>
            <div className={styles.tag2}>TOO NARROW</div>
            <div className={styles.tag2}>PERFECT</div>
            <div className={styles.tag2}>TOO WIDE</div>
          </div>
        </div>
        <div>
          <div className={styles.tag}>COMFORT</div>
          <div id="container" className={styles.container}>
            <div className={styles.meter} />
            <div className={styles.meter} />
            <div className={styles.meter} />
            <div className={styles.meter} />
          </div>
          <div
            className={styles.triangle}
            style={{ left: this.conversion(comfortAvg, length) }}
          />
          <div className={styles.tag2Div}>
            <div className={styles.tag2}>UNCOMFORTABLE</div>
            <div className={styles.tag2}>COMFORTABLE</div>
          </div>
        </div>
        <div>
          <div className={styles.tag}>QUALITY</div>
          <div id="container" className={styles.container}>
            <div className={styles.meter} />
            <div className={styles.meter} />
            <div className={styles.meter} />
            <div className={styles.meter} />
          </div>
          <div
            className={styles.triangle}
            style={{ left: this.conversion(qualityAvg, length) }}
          />
          <div className={styles.tag2Div}>
            <div className={styles.tag2}>POOR</div>
            <div className={styles.tag2}>PERFECT</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
