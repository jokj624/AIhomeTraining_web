require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware'
//import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

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

const port = PORT;
app.listen(4000, () => {
    console.log("Listening to port 4000");
});