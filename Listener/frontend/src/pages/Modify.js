import React from 'react';
import { Link } from "react-router-dom";
import AuthTemplate from '../components/auth/AuthTemplate';
import ModifyForm from '../containers/auth/ModifyForm';

const Modify = ({ match }) => {
    return (
        <AuthTemplate>
            <ModifyForm/>
        </AuthTemplate>    
        
    );
};

export default Modify;