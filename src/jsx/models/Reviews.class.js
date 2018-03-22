import Dexie from 'dexie';
import Sessions from '../util/Sessions.class';

export default class Reviews {
  init() {
    this.db = new Dexie("ShopifyReviews-Compass");
    this.db.version(1).stores({
      reviews: "++, [author+date], content, ratings"
    });
    this.db.open();
  }

  async getAll() {
    const cachedReviews = this.db.reviews;

    const count = await cachedReviews.count();
    const validCache = Sessions.isDBcacheValid();

    if (count && validCache) {
      const cachedReviewsArray = await cachedReviews.toArray(reviews => reviews);
      return this.sortReviewRecords(cachedReviewsArray);
    } else {
      const reviews = await this.getAllFromAPI();
      this.cacheDB(reviews);
      return this.sortReviewRecords(reviews);;
    }
  }

  async getAllFromAPI() {
    return fetch('https://api.apify.com/v1/Ew7iFzrjYuf2jHZCY/crawlers/KFxpYZqQTrWuEnpd2/lastExec/results?token=ER5TAaboZcE8jzeug43Nrryp3&hideUrl=1&simplified=1')
      .then(res => res.json());
  }

  async cacheDB(reviews) {
    const reviewsKeys = Object.values(reviews).map(review => `${review.author}-${review.date}`);
    const lastKey = await this.db.reviews.bulkPut(reviews, reviewsKeys);

    if (lastKey) {
      Sessions.setCachedDBexpiration();
      console.log(`Done adding ${reviews.length} records`);
    }
  }

  sortReviewRecords(reviewRecords) {
    return reviewRecords.sort((r1, r2) => new Date(r1) - new Date(r2));
  }
}

