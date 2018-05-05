import "babel-polyfill";
import grabity from 'grabity';
import path from 'path';
import { shopify_store_metas } from '../db/models';

export default class WebsiteMetaApi {
  constructor() {
    this.shopify_store_metas = shopify_store_metas;
  }
  async getMetas(urlHashes) {
    let metaResults = await Promise.all(urlHashes
      .map(urlHash => grabity.grabIt(urlHash.href)
        .then(metas => ({
          title: urlHash.storeName,
          url: urlHash.href,
          ...metas
        }))
        .catch(() => {})
      ));

    metaResults = metaResults.filter(meta => meta);
    this.shopify_store_metas.cacheMetas(metaResults);
    return metaResults;
  }
  getCachedMetas(countLimit) {
    return this.shopify_store_metas.getCachedMetas(countLimit);
  }
}
