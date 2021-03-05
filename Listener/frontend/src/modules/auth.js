import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
  } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER'
  );

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN'
  );

const [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE] = createRequestActionTypes(
    'auth/MODIFY'
  );

  const [UPDATETOTALTIME, UPDATETOTALTIME_SUCCESS, UPDATETOTALTIME_FAILURE] = createRequestActionTypes(
    'auth/UPDATETOTALTIME'
  );
  /*const [UPDATELEVEL, UPDATELEVEL_SUCCESS, UPDATELEVEL_FAILURE] = createRequestActionTypes(
    'auth/UPDATELEVEL'
  );
*/
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
      form, // register , login
      key, // username, password, passwordConfirm
      value, // 실제 바꾸려는값
    })
  );

  export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
  export const register = createAction(REGISTER, ({ username, password }) => ({
    username,
    password
  }));
  export const login = createAction(LOGIN, ({ username, password }) => ({
    username,
    password
  }));
  export const modify = createAction(MODIFY, ({ username, password }) => ({
    username,
    password
  }));
  export const updateTotalTime = createAction(UPDATETOTALTIME, ({ username, totalTime ,level}) => ({
    username,
    totalTime,
    level
  }));
  /*
  export const updateLevel = createAction(UPDATELEVEL, ({ username, level }) => ({
    username,
    level
  }));
  */

  const registerSaga = createRequestSaga(REGISTER, authAPI.register);
  const loginSaga = createRequestSaga(LOGIN, authAPI.login);
  const modifySaga = createRequestSaga(MODIFY, authAPI.modify);
  const updateTotalTimeSaga = createRequestSaga(UPDATETOTALTIME, authAPI.updateTotalTime);
  //const updateLevelSaga = createRequestSaga(UPDATELEVEL, authAPI.updateLevel);

  export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(MODIFY, modifySaga);
    yield takeLatest(UPDATETOTALTIME, updateTotalTimeSaga);
    //yield takeLatest(UPDATELEVEL, updateLevelSaga);  
  };

  const initialState = {
    register: {
      username: '',
      password: '',
      passwordConfirm: ''
    },
    login: {
      username: '',
      password: ''
    },
    modify: {
      password: '',
      passwordConfirm: ''
    },
    auth: null,
    authError: null
  };

  const auth = handleActions(
    {
      [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
        produce(state, draft => {
          draft[form][key] = value; // 예: state.register.username을 바꾼다
        }),
      [INITIALIZE_FORM]: (state, { payload: form }) => ({
        ...state,
        [form]: initialState[form],
        authError: null // 폼 전환 시 회원 인증 에러 초기화
      }),
      // 회원가입 성공
      [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
      }),
      // 회원가입 실패
      [REGISTER_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      }),
      // 로그인 성공
      [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
      }),
      // 로그인 실패
      [LOGIN_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      }),
      //비밀번호 변경 성공
      [MODIFY_SUCCESS]: (state) => ({
        ...state,
        authError: null,
        auth : null
      }),
      // 비밀번호변경 실패
      [MODIFY_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      }),
      [UPDATETOTALTIME_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
      }),
      [UPDATETOTALTIME_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      })/*,
      [UPDATELEVEL_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
      }),
      [UPDATELEVEL_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error
      })
      */
    },
    initialState
  );

export default auth;