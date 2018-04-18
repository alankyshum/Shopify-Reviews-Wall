export default class WebsiteMeta {
  constructor() {
    this.url = {
      websiteMetaApi: '/api/website_meta'
    };
  }
  async saveMetas(reviewList) {
    const websiteHrefHash = reviewList.map(review => ({
      storeName: review.author,
      href: review.storeHref,
    }));

    const postURLs = await fetch(this.url.websiteMetaApi, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(websiteHrefHash)
    });

    const crawledMetas = await postURLs.json();
    return crawledMetas;
  }
}
