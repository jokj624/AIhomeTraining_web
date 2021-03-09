import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { changeField, initializeForm, modify } from '../../modules/auth';
import ModifyAuthForm from '../../components/auth/ModifyAuthForm';
import { logout } from '../../modules/user';

const ModifyForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, user } = useSelector(({ auth, user }) => ({
      form: auth.modify,
      user: user.user
    }));
    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'modify',
          key: name,
          value,
        }),
      );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
      e.preventDefault();
      const {password, passwordConfirm} = form;
      const username = user.username;
      if([password, passwordConfirm].includes('')) {
        setError('빈 칸을 모두 입력하세요.');
        return;
      }
        // 비밀번호가 일치하지 않는다면
        if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        dispatch(changeField({ form: 'modify', key: 'password', value: '' }));
        dispatch(
          changeField({ form: 'modify', key: 'passwordConfirm', value: '' }),
        );
        return;
      }
      dispatch(modify({ username, password }));
      dispatch(logout());
    };

    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
      dispatch(initializeForm('modify'));
    }, [dispatch]);
  
    useEffect(() => {
      if (!user) {
        console.log('변경 성공');
        alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
        history.push('/');
      }
      /*
        if (authError) {
          console.log('오류 발생');
          console.log(authError);
          setError('변경 실패');
          return;
        }
          console.log('변경 성공');
          dispatch(logout());
          history.push('/');
          try {
            localStorage.setItem('user', JSON.stringify(user));
          } catch (e) {
          console.log('localStorage is not working');
          }
         */ 
      }, [history, user]);

    return (
      <ModifyAuthForm
        type="modify"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    );
  };

  export default withRouter(ModifyForm);