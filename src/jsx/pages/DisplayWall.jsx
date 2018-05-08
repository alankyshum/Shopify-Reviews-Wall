import { Component } from 'inferno';
import moment from 'moment';
import Reviews from '../models/Reviews.class';
import '../../scss/pages/DisplayWall.scss';
import WebsiteMeta from '../models/WebsiteMeta.class';

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {},
    }
  }
  render() {
    return (
      <div className="display-wall">
        <div className="content">
          <h2 className="content-author">
            <a href={ this.state.review.href }>{ this.state.review.storeName }{ this.generateStars(this.state.review.ratings, '★') }</a>
          </h2>
          <p className="content-body">{ this.state.review.content }</p>
          <img className="content-logo" src={ this.state.review.thumbnail } alt={ this.state.review.storeName }/>
        </div>
        <div className="background">
          <img src={ this.state.review.thumbnail } alt={ this.state.review.storeName }/>
        </div>
      </div>
    );
  }
  async componentWillMount() {
    const allReviews = await this.getRandomReview();

    setInterval(async () => {
      const randomReview = await this.getRandomReviewMeta(allReviews);
      this.setState({ review: randomReview });
    }, 1000);
  }
  async getRandomReview() {
    const reviews = new Reviews();
    const reviewItems = await reviews.getAll();
    return reviewItems;
  }
  async getRandomReviewMeta(reviewList) {
    const websiteMeta = new WebsiteMeta();

    const randomIndex = Math.floor(Math.random() * reviewList.length);
    const randomReview = reviewList[randomIndex];
    const storeMetas = await websiteMeta.getMetas({
      attributes: ['store_name', 'store_description', 'store_url', 'store_og_thumbnail'],
      where: { store_url: randomReview.storeHref }
    });

    return {
      author: randomReview.author,
      content: randomReview.content,
      ratings: randomReview.ratings,
      href: randomReview.storeHref,
      description: storeMetas && storeMetas[0].store_description,
      storeName: storeMetas && storeMetas[0].store_name,
      thumbnail: storeMetas && storeMetas[0].store_og_thumbnail,
    }
  }
  generateStars(ratingsCnt, symbol) {
    const returnArray = [];
    for(let i = 0; i < parseInt(ratingsCnt); i++) {
      returnArray.push(symbol);
    }
    return returnArray;
  }
}
