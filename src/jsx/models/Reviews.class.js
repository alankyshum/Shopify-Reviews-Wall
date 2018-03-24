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
      let reviews = await this.getAllFromAPI();
      reviews = reviews.filter(record => !!record.date);
      this.cacheDB(reviews);
      return this.sortReviewRecords(reviews);
    }
  }

  async getAllFromAPI() {
    let rawRecords = await fetch('https://api.apify.com/v1/Ew7iFzrjYuf2jHZCY/crawlers/KFxpYZqQTrWuEnpd2/lastExec/results?token=ER5TAaboZcE8jzeug43Nrryp3&hideUrl=1&simplified=1');
    rawRecords = await rawRecords.json();
    return rawRecords.filter(record => !record.value);
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
    return reviewRecords
      .sort((r1, r2) => ( (new Date(r2.date)) - (new Date(r1.date)) ));
  }
}

