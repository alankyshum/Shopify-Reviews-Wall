export default function(sequelize, DataTypes) {
  const shopify_store_metas = sequelize.define('shopify_store_metas', {
    store_name: DataTypes.STRING,
    store_url: DataTypes.STRING,
    store_description: DataTypes.STRING,
  });

  shopify_store_metas.cacheStockDetails = function(stockDetails) {
    const uniqueIDs = Array.from(new Set(stockDetails.map(d => d.urlID)));

    return this.findAll({ attributes: ['robinhood_id'] })
      .then(existingIDArray => {
        existingIDArray = existingIDArray.map(existingID => existingID.get('robinhood_id'));
        console.log(existingIDArray);

        const newStockDetails = stockDetails
          .filter(detail => {
            console.log(detail.urlID, !existingIDArray.includes(detail.urlID))
            return !existingIDArray.includes(detail.urlID)
          })
          .map(detail => ({
            robinhood_id: detail.details.id,
            name: detail.details.name,
            simple_name: detail.details.simple_name,
            symbol: detail.details.symbol,
            country: detail.details.country,
          }));

        return shopify_store_metas.bulkCreate(newStockDetails);
      });
  }

  return shopify_store_metas;
};
