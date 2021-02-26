import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');

const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/WRITE_COMMENT');

const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);
export const writeComment = createAction(WRITE_COMMENT, ({ text, username, id }) => ({
  text,
  username,
  id,
}));
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, postsAPI.comment);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [WRITE_COMMENT]: state => ({
      ...state,
      error: null,
    }),
    // 포스트 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 댓글 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),  
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;