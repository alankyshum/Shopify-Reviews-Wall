require("babel-polyfill");
import grabity from 'grabity';

export default class WebsiteMetaApi {
  constructor() {}
  async getMetas(urls) {
    const failedRequestUrls = [];
    const metaResults = await Promise.all(urls
      .map(url => grabity.grabIt(url)
        .catch(() => { failedRequestUrls.push(url); })
      ))

    return [metaResults, failedRequestUrls];
  }
}
