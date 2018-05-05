export default class WebsiteMeta {
  constructor() {
    this.url = {
      websiteMetaApi: '/api/website_meta'
    };
  }
  async getMetas(reviewList) {
    const currentViewCount = 10;
    const getMetasAPI = await fetch(`${this.url.websiteMetaApi}/${currentViewCount}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  async saveMetas(reviewList) {
    const websiteHrefHash = reviewList.map(review => ({
      storeName: review.author,
      href: review.storeHref,
    }));

    const saveMetasAPI = await fetch(this.url.websiteMetaApi, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(websiteHrefHash)
    });

    const crawledMetas = await saveMetasAPI.json();
    return crawledMetas;
  }
}
