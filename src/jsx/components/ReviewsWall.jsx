import { render, Component } from 'inferno';
import moment from 'moment';
import Reviews from '../models/Reviews.class';
import '../../scss/components/RawData.scss';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reviewItems: []
    };
  }
  render() {
    return (
      <div uk-grid>
        {
          this.state.loading ? <h1>Loading</h1> : ''
        }
        {this.state.reviewItems.map(reviewItem => (
          <div class="uk-card uk-card-default uk-card-body uk-width-1-2@l uk-width-1-1@s">
            <div class="uk-card-badge uk-label">{ reviewItem.ratings }</div>
            <h3 class="uk-card-title">{ reviewItem.author } <small>{ moment(reviewItem.date).fromNow() }</small></h3>
            <p>{ reviewItem.content }</p>
          </div>
        ))}
      </div>
    );
  }
  componentWillMount() {
    this.getReviewItems()
      .then(reviewItems => {
        const reviewItemsByPeriod = this.filterByPeriod(reviewItems, this.props['date-range']);
        this.setState({ loading: false });
        this.setState({ reviewItems: reviewItemsByPeriod })
      });
  }
  async getReviewItems() {
    const review = new Reviews();
    const reviewsList = await review.getAll();
    return reviewsList;
  }
  filterByPeriod(reviewItems, period) {
    const startOfWeek = moment().subtract(1, period);
    return reviewItems.filter(reviewItem => {
      return reviewItem.date && moment(reviewItem.date) >= startOfWeek;
    });
  }
}
