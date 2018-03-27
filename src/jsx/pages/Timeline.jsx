import { Component } from 'inferno';
import moment from 'moment';
import Reviews from '../models/Reviews.class';
import '../../scss/pages/Timeline.scss';

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };

    this.timeline = {
      monthHeadings: {}
    };
  }
  render() {
    return (
      <div className="timeline">
        <div className="timeline-wrapper">
          {
            this.state.reviews.map(review => {
              const monthTimestamp = moment(review.date).format('MM-YYYY');

              const reviewCard = (
                <div class="uk-card uk-card-default uk-card-body">
                  <div class="uk-card-badge uk-label">{ review.ratings }</div>
                  <h3 class="uk-card-title">{ review.author } <small>{ (new Date(review.date)).toString() }</small></h3>
                  <p>{ review.content }</p>
                </div>
              );

              const monthHeading = (
                <h2>{ monthTimestamp }</h2>
              )

              if (this.timeline.monthHeadings[monthTimestamp]) {
                return reviewCard;
              }

              this.timeline.monthHeadings[monthTimestamp] = {}
              return [monthHeading, reviewCard];
            })
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
      })
  }
}
