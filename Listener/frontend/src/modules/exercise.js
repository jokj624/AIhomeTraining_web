import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
  } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const INITIALIZE = 'exercise/INITIALIZE'; // 모든 내용 초기화
const UNLOAD_EXERCISE = 'exercise/UNLOAD_exercise'; //운동 비우기
const [
    WRITE_EXERCISE,
    WRITE_EXERCISE_SUCCESS,
    WRITE_EXERCISE_FAILIRE,
] = createRequestActionTypes('exercise/FIND_EXERCISE'); //운동 찾기

export const writeExercise = createAction(WRITE_EXERCISE, ({ title, username }) => ({
    title,
    username
  }));
export const unloadExercise = createAction(UNLOAD_EXERCISE);

const writeExerciseSaga = createRequestSaga(WRITE_EXERCISE, authAPI.exercise);

export function* exerciseSaga(){
    yield takeLatest(WRITE_EXERCISE, writeExerciseSaga);
}

const initialState = {
    exercise: null,
    error: null,
};

const exercise = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [WRITE_EXERCISE]: state=>({
            ...state,
            exercise: null,
            error: null,
        }),
        [WRITE_EXERCISE_SUCCESS]: (state, { payload: exercise}) => ({
            ...state,
            exercise,
        }),
        [WRITE_EXERCISE_FAILIRE]: (state, { payload: error}) => ({
            ...state,
            error,
        }),
        [UNLOAD_EXERCISE]: () => initialState,
    },
    initialState,
);

export default exercise;