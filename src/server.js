import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import { createReadStream } from 'fs';
import serverConfig from './config/server.config'

const app = new Koa();
const router = new Router();

router
  .get('/crawler_callback', (ctx, next) => {
    ctx.body = ctx.request.query;
  })
  .get('/*', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = createReadStream('index.html');
  });

app.use(serve('.'));
app.use(router.routes());

app.listen(serverConfig.port);
console.log(`Server listening at ${serverConfig.port}`);
