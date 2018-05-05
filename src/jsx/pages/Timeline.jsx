import { Component } from 'inferno';
import moment from 'moment';
import Reviews from '../models/Reviews.class';
import '../../scss/pages/Timeline.scss';
import WebsiteMeta from '../models/WebsiteMeta.class';

export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };

    this.timeline = {
      wrapperElement: null,
      monthHeadingsPositions: {}
    };
  }
  render() {
    return (
      <div className="timeline">
        <div className="timeline-wrapper" ref={ element => {this.timeline.wrapperElement = element} }>
          {
            this.state.reviews.map(review => {
              const reviewCard = (
                <div class="uk-card uk-card-default uk-card-body">
                  <div class="uk-card-badge uk-label">{ review.ratings }</div>
                  <h3 class="uk-card-title">
                  <a href={review.storeHref}>{ review.author }</a>
                  <small>{ (new Date(review.date)).toString() }</small></h3>
                  <p>{ review.content }</p>
                </div>
              );

              const monthTimestamp = this.formatMonthHeadingTimestamp(review.date);
              if (this.timeline.monthHeadingsPositions[monthTimestamp]) {
                return reviewCard;
              }

              this.timeline.monthHeadingsPositions[monthTimestamp] = {};
              const monthHeading = (
                <h2 ref={ element => {this.cacheMonthHeadingPosition(monthTimestamp, element)} }>{ monthTimestamp }</h2>
              )
              return [monthHeading, reviewCard];
            })
          }
        </div>
        {/* <div className="timeline-scrollbar" style={ {position: 'fixed', top: 0, right: 0} }>
          {
            Object.entries(this.timeline.monthHeadingsPositions).map(monthHeading => {
              const positionStyle = {
                top: this.getMonthHeadingPositionOnScrollbar(monthHeading[1]) + '%'
              };
              return (
                <div className="timeline-scrollbar-mark" style={ positionStyle }>{ monthHeading[0] }</div>
              )
            })
          }
        </div> */}
      </div>
    );
  }
  componentWillMount() {
    this.setReviewList();
  }
  async setReviewList() {
    const reviews = new Reviews();
    const reviewItems = await reviews.getAll();
    this.setState({ reviews: reviewItems });

    const websiteMeta = new WebsiteMeta();
    websiteMeta.getMetas(reviewItems);
  }
  formatMonthHeadingTimestamp(date) {
    return moment(date).format('MM-YYYY');
  }
  cacheMonthHeadingPosition(monthTimestamp, element) {
    this.timeline.monthHeadingsPositions[monthTimestamp] = element.getClientRects()[0].y;
  }
  getMonthHeadingPositionOnScrollbar(positionOnSourceWrapper) {
    const sourceWrapperHeight = this.timeline.wrapperElement.getClientRects()[0].height;
    return positionOnSourceWrapper / sourceWrapperHeight * 100;
  }
}
