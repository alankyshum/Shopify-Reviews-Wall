require("babel-polyfill");

import grabity from 'grabity';

export default {
  async getMetas(urls) {
    const promiseArray = urls.map(url => grabity.grabIt(url));
    const websiteMetas = await Promise.all(promiseArray);

    const metaHash = {};
    urls.forEach((url, i) => {
      metaHash[url] = websiteMetas[i]
    });

    return metaHash;
  }
}
