import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');
const [
  SEARCH_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
] = createRequestActionTypes('get/SEARCH_POSTS');

export const listPosts = createAction(
    LIST_POSTS,
    ({ username, page }) => ({ username, page }),
);

export const searchPosts = createAction(
    SEARCH_POSTS,
    ({ page, option, content }) => ({ page, option, content }),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
const searchPostsSaga = createRequestSaga(SEARCH_POSTS, postsAPI.searchPosts);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
  yield takeLatest(SEARCH_POSTS, searchPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SEARCH_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [SEARCH_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default posts;