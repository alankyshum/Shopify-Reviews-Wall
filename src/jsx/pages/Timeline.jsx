import { Component } from 'inferno';
import Reviews from '../models/Reviews.class';

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timelineCursorPos: 0,
      timelineTranslate: 0,
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
        <input type="range" step="1"
          min={ this.state.timeline.minDateValue }
          max={ this.state.timeline.maxDateValue }
          defaultValue={ this.state.timelineCursorPos }
          onChange={ this.timelineDrag.bind(this) } />
        <span>{ (new Date(this.state.timelineCursorPos)).toString() }</span>
        <div className="timeline-wrapper" style={{ transform: `translateY(${this.state.timelineTranslate}px)`}}>
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
    this.setState({ timelineCursorPos: parseInt(event.target.value) });
    const totalTimelineHeight = document.getElementsByClassName('timeline-wrapper')[0].clientHeight;
    const timelineTranslate = -1 * totalTimelineHeight * (event.target.value - this.state.timeline.minDateValue) / (this.state.timeline.maxDateValue - this.state.timeline.minDateValue);
    this.setState({ timelineTranslate: timelineTranslate });
  }
}
