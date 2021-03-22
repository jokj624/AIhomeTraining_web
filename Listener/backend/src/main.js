require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

const PORT = process.env.PORT || 5000;
const MONGO_URI="mongodb+srv://jokj624:290315ab@youtube-clone.8yicy.mongodb.net/test";

mongoose
.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology:true})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(e => {
    console.error(e);
});
        

const app = new Koa();
const router = new Router();
router.use('/api', api.routes());
app.use(bodyParser());
app.use(jwtMiddleware);


app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
    if(ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        await send(ctx, 'index.html', {root:buildDirectory});
    }
});

app.listen(PORT, () => {
    console.log("Listening to port 4000");
});
