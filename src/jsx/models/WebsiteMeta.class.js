export default class WebsiteMeta {
  constructor() {
    this.url = {
      websiteMetaApi: '/api/website_meta'
    };
  }
  async saveMetas(urls) {
    const postURLs = await fetch(this.url.websiteMetaApi, {
      method: 'post',
      body: JSON.stringify(urls)
    });
    const crawledMetas = await postURLs.json();
    return crawledMetas;
  }
}
