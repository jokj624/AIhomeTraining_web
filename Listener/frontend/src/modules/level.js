import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
  } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const INITIALIZE = 'level/INITIALIZE'; // 모든 내용 초기화
const UNLOAD_LEVEL = 'level/UNLOAD_LEVEL'; //레벨 비우기
const [
    FIND_LEVEL,
    FIND_LEVEL_SUCCESS,
    FIND_LEVEL_FAILIRE,
] = createRequestActionTypes('level/FIND_LEVEL'); //레벨 찾기

export const findLevel = createAction(FIND_LEVEL, ({ username }) => ({
    username,
}));
export const unloadLevel = createAction(UNLOAD_LEVEL);

const findLevelSaga = createRequestSaga(FIND_LEVEL, authAPI.findLevel);

export function* levelSaga(){
    yield takeLatest(FIND_LEVEL, findLevelSaga);
}

const initialState = {
    levelInfo: null,
    error: null,
};

const level = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [FIND_LEVEL]: state=>({
            ...state,
            levelInfo: null,
            error: null,
        }),
        [FIND_LEVEL_SUCCESS]: (state, { payload: levelInfo}) => ({
            ...state,
            levelInfo,
        }),
        [FIND_LEVEL_FAILIRE]: (state, { payload: error}) => ({
            ...state,
            error,
        }),
        [UNLOAD_LEVEL]: () => initialState,
    },
    initialState,
);

export default level;