import { render, Component } from 'inferno';
import Reviews from '../models/Reviews.class';
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
              <td>{ this.parseDate(reviewItem.date) }</td>
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
    await review.init()
    const reviewsList = await review.getAll();
    return reviewsList.toArray(reviewItems => reviewItems);
  }
  parseDate(dateString) {
    return (new Date(dateString)).toLocaleDateString();
  }
}
