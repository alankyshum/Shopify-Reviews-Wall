import Dexie from 'dexie';

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
    if (count) return cachedReviews;

    const reviews = await this.getAllReviews();
    const reviewsKeys = Object.values(reviews)
      .map(review => `${review.author}-${review.date}`);

    return this.db.reviews.bulkPut(reviews, reviewsKeys)
      .then((lastKey) => {
        console.log(`Done adding ${reviews.length} records`);
        return this.db.reviews;
      }).catch(Dexie.BulkError, function (e) {
        console.error(e);
      });
  }

  async getAllFromAPI() {
    return fetch('https://api.apify.com/v1/Ew7iFzrjYuf2jHZCY/crawlers/KFxpYZqQTrWuEnpd2/lastExec/results?token=ER5TAaboZcE8jzeug43Nrryp3&hideUrl=1&simplified=1')
      .then(res => res.json());
  }
}

