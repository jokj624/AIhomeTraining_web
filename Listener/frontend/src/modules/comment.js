import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';


const INITIALIZE = 'comment/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'comment/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/WRITE_COMMENT'); // 댓글 작성
const [
  READ_COMMENT,
  READ_COMMENT_SUCCESS,
  READ_COMMENT_FAILURE,
] = createRequestActionTypes('comment/READ_COMMENT'); //댓글 읽기

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(WRITE_COMMENT, ({ text, username, level, id }) => ({
  text,
  username,
  level,
  id,
}));
export const readComment = createAction(READ_COMMENT, ({ _id, title }) => ({
  _id,
  title,
}));

//export const readComment = createAction(READ_COMMENT, id => id);

//saga 생성
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, postsAPI.comment);
const readCommentSaga = createRequestSaga(READ_COMMENT, postsAPI.getComment);

export function* commentSaga() {
    yield takeLatest(WRITE_COMMENT, writeCommentSaga);
    yield takeLatest(READ_COMMENT, readCommentSaga);
}
const initialState = {
    com: null,
    error: null,
};

const comment = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 key 값을 업데이트
          }),
        [WRITE_COMMENT]: state => ({
            ...state,
            com: null,
            error: null,
        }),
          // 포스트 작성 성공
        [WRITE_COMMENT_SUCCESS]: (state, { payload: com }) => ({
            ...state,
            com,
        }),
        // 댓글 작성 실패
        [WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),  
        [READ_COMMENT_SUCCESS]: (state, {payload: com}) => ({
            ...state,
            com,
        }),
        [READ_COMMENT_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),    
    },
    initialState,
);

export default comment;