const fs = require('fs');
const path = require('path');
require('dotenv').config();

const env = process.env.NODE_ENV;

const configPresets = {
  development: {
    username: process.env.DB_DEVELOPMENT_USERNAME,
    password: process.env.DB_DEVELOPMENT_PASSWORD,
    database: process.env.DB_DEVELOPMENT_DATABASE,
    host: process.env.DB_DEVELOPMENT_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        reuqire: true,
        key: fs.readFileSync(path.resolve(`${__dirname}/../ssl/client-key.key`)),
        cert: fs.readFileSync(path.resolve(`${__dirname}/../ssl/client-cert.crt`)),
        ca: fs.readFileSync(path.resolve(`${__dirname}/../ssl/server-ca.pem`))
      },
    }
  }
}

module.exports = configPresets[env] || configPresets.development;
