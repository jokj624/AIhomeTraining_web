import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
  });

export function* rootSaga() {
    yield all([authSaga(), userSaga()]);
}

export default rootReducer;