import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();
auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.patch('/modify/:id', authCtrl.modify);
auth.patch('/level', authCtrl.findLevel);
auth.post('/exercises', authCtrl.exercise);
auth.patch('/exercises', authCtrl.updateTotalTime);
//auth.patch('/exercises', authCtrl.updateLevel);

export default auth;