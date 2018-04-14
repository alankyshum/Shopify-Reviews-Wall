'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('shopify_store_metas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    store_name: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    store_url: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    store_description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // required by sequelize
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}

export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('shopify_store_metas');
}
