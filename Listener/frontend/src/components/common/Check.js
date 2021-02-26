import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Check = () => {
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.modify,
        auth: auth,
        authError: auth.authError,
        user: user.user
      }));
  return (
    <div>운동 한 시간은..{user.s}<br/>지금까지 총 운동시간은...{user.totalTime}<br/>다시 운동을 하시려면 재시작을 눌러주세요.</div>
  )
};


export default Check;
