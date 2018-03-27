import { Component } from 'inferno';
import moment from 'moment';
import Reviews from '../models/Reviews.class';
import '../../scss/pages/Timeline.scss';

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursorPos: 0,
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
      <div className="timeline">
        <input className="timeline-slider" type="range" step="1"
          min={ this.state.timeline.minDateValue }
          max={ this.state.timeline.maxDateValue }
          value={ this.state.timelineCursorPos }
          onInput={ this.timelineDrag.bind(this) } />
        <span className="timeline-indicator" style={{ top: `${this.state.cursorPos}px` }}>{ moment(this.state.timelineCursorPos).format('MMM Do YYYY') }</span>
        <div className="timeline-wrapper">
          {
            this.state.reviews.map(review => (
              <div class="uk-card uk-card-default uk-card-body uk-width-1-2@l uk-width-1-1@s">
                <div class="uk-card-badge uk-label">{ review.ratings }</div>
                <h3 class="uk-card-title">{ review.author } <small>{ (new Date(review.date)).toString() }</small></h3>
                <p>{ review.content }</p>
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
        return document.body.clientHeight * (this.state.timeline.maxDateValue - sourcePos) / (this.state.timeline.maxDateValue - this.state.timeline.minDateValue);
      }
      case 'timeline': {
        const timelinePos = this.state.timeline.maxDateValue - (this.state.timeline.maxDateValue - this.state.timeline.minDateValue) * (sourcePos / document.body.clientHeight);
        // this.setState({ cursorPos: timelinePos });
        return timelinePos;
      }
    }
  }
}
