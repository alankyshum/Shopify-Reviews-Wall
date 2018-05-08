export default function(sequelize, DataTypes) {
  const shopify_store_metas = sequelize.define('shopify_store_metas', {
    store_name: DataTypes.STRING,
    store_description: DataTypes.STRING,
    store_url: DataTypes.STRING,
    store_og_thumbnail: DataTypes.STRING,
  });

  shopify_store_metas.cacheMetas = cacheMetas;
  shopify_store_metas.getCachedMetas = getCachedMetas;

  function cacheMetas(storeMetas) {
    const modeData = parseToModel(storeMetas);
    return shopify_store_metas.bulkCreate(modeData, {})
      .then(insertionResult => insertionResult)
      .catch(e => {
        const ignoredErrors = ['SequelizeUniqueConstraintError'];
        if (ignoredErrors.includes(e.name)) return;

        console.error(e);
      });
  }

  function getCachedMetas(queryCondition) {
    return shopify_store_metas.findAll(queryCondition);
  }

  function parseToModel(metaInfoList) {
    return metaInfoList.map(metaInfo => ({
      store_name: metaInfo.title,
      store_description: metaInfo.description,
      store_url: metaInfo.url,
      store_og_thumbnail: metaInfo.image,
    }));
  }

  return shopify_store_metas;
};
