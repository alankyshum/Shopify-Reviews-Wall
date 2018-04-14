# Shopify Reviews Streams

> Shopify does not have official API returning all the reviews of apps listed on its app store. Therefore, the API was built manually using [apify](https://apify.com).

## Development
### Docker Environment
  1. debug `docker run -it -v $(pwd):/app shopifyreviewwall_shopify-review-wall:latest /bin/bash`
### Local Development
```bash
yarn install
yarn build  # build from es6 files
yarn start  # Start server
```

Database not working? `yarn migrate direct`
  * Since we are running on prod directly, db version is always the latest
  * When this service scales up, there will be an isolated local database for development

## Timeline

### Stage 1 - Mar 2018
  * Showing reviews for Sage Compass Shopify App as test case
