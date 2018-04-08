import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import { createReadStream } from 'fs';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import serverConfig from './config/server.config'

import WebsiteMetasApi from './api/WebsiteMetaApi';

const app = new Koa();
onerror(app);
app.use(bodyParser());

const router = new Router();
router
  .get('/crawler_callback', (ctx, next) => {
    ctx.body = ctx.request.query;
    next();
  })
  .post('/api/website_meta', async (ctx, next) => {
    const urls = ctx.request.body;
    const websiteMetas = await WebsiteMetasApi.getMetas(urls);
    ctx.status = 200;
    ctx.body = websiteMetas;
  })
  .get('/*', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = createReadStream('index.html');
  });

app.use(serve('.'));
app.use(router.routes());

app.listen(serverConfig.port);
console.log(`Server listening at ${serverConfig.port}`);
