import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import ModifyForm from '../containers/auth/ModifyForm';

const Modify = () => {
    return (
        <AuthTemplate>
            <ModifyForm/>
        </AuthTemplate>    
    );
};

export default Modify;