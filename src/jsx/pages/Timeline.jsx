import { Component } from 'react';
import Slider from 'rc-slider';
import Reviews from '../models/Reviews.class';
import '../../scss/pages/Timeline.scss';
import 'rc-slider/assets/index.css';

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timelineCursorPos: 0,
      timeline: {
        minDateValue: 0,
        maxDateValue: 0
      },
      reviews: []
    }
  }
  render() {
    return (
      <div>
        <input className="timeline-slider" type="range" step="1"
          min={ this.state.timeline.minDateValue }
          max={ this.state.timeline.maxDateValue }
          value={ this.state.timelineCursorPos }
          onInput={ this.timelineDrag.bind(this) } />
        <span style="position: fixed; right: 0; top: 0; z-index: 99;">{ (new Date(this.state.timelineCursorPos)).toString() }</span>
        <div className="timeline-wrapper">
          {
            this.state.reviews.map(review => (
              <div>
                <h2>{ review.content }</h2>
                <small>{ review.date }</small>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  componentWillMount() {
    this.setReviewList();
  }
  componentDidMount() {
    let scrollDebouncer = null;
    window.addEventListener('scroll', () => {
      console.log('scrolling');
      const timelineTranslate = this.calculateTranslatePosition(window.scrollY, 'timeline');
      this.setState({ timelineCursorPos: timelineTranslate });
    });
  }
  setReviewList() {
    const reviews = new Reviews();
    reviews.getAll()
      .then(reviewItems => {
        this.setState({ reviews: reviewItems });

        const maxDateValue = (new Date(reviewItems[0].date)).valueOf();
        const minDateValue = (new Date(reviewItems[reviewItems.length - 1].date)).valueOf();
        const cursorPos = minDateValue;
        this.setState({ timeline: { minDateValue, maxDateValue } });
        this.setState({ timelineCursorPos: cursorPos });
      })
  }
  timelineDrag(event) {
    console.log('moving');
    this.setState({ timelineCursorPos: parseInt(event.target.value) });

    const timelineTranslate = this.calculateTranslatePosition(event.target.value, 'window');
    window.scrollTo(0, timelineTranslate);
  }
  calculateTranslatePosition(sourcePos, toTargetPos) {
    switch (toTargetPos) {
      case 'window': {
        return document.body.clientHeight * (sourcePos - this.state.timeline.minDateValue) / (this.state.timeline.maxDateValue - this.state.timeline.minDateValue);
      }
      case 'timeline': {
        return this.state.timeline.minDateValue + (this.state.timeline.maxDateValue - this.state.timeline.minDateValue) * (sourcePos / document.body.clientHeight);
      }
    }
  }
}
