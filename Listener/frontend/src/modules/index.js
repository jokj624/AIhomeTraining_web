import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import level, {levelSaga} from './level';
import exercise, {exerciseSaga} from './exercise';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  level,
  exercise
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga(), levelSaga(), exerciseSaga()]);
}

export default rootReducer;