import { render, Component } from 'react';
import Reviews from '../models/Reviews.class';
import moment from 'moment';
import '../../scss/components/RawData.scss';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewItems: []
    };
  }
  render() {
    return (
      <table class="uk-table uk-table-striped uk-table-hover uk-table-small">
        <thead>
          <th>Author</th><th>Date</th><th>Content</th><th>Ratings</th>
        </thead>
        <tbody>
          {this.state.reviewItems.map(reviewItem => (
            <tr>
              <td>{ reviewItem.author }</td>
              <td>{ moment(reviewItem.date).fromNow() }</td>
              <td>{ reviewItem.content }</td>
              <td>{ reviewItem.ratings }</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  componentWillMount() {
    this.getReviewItems()
      .then(reviewItems => {
        this.setState({ reviewItems })
      });
  }
  async getReviewItems() {
    const review = new Reviews();
    const reviewsList = await review.getAll();
    return reviewsList;
  }
  parseDate(dateString) {
    return (new Date(dateString)).toLocaleDateString();
  }
}
