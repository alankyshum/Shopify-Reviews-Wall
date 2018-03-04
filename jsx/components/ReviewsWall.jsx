import { render, Component } from 'inferno';
import Reviews from '../models/Reviews.class';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewItems: []
    };
  }
  componentWillMount() {
    this.getReviewItems()
      .then(reviewItems => {
        this.setState({ reviewItems })
      });
  }
  render() {
    return (
      <div>
        <h1>Shopify Reviews - Compass</h1>
        <table>
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
      </div>
    );
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
