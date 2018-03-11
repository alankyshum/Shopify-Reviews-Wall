import { render, Component } from 'inferno';
import Reviews from '../models/Reviews.class';
import '../../scss/components/ReviewsWall.scss';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewItems: []
    };
  }
  render() {
    return (
      <div class="ReviewsWall">
        <header>
          <h2 class="uk-heading-line uk-text-center"><span>Raw Reviews</span></h2>
        </header>
        <article class="uk-overflow-auto">
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
        </article>
      </div>
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
