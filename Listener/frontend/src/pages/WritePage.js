import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import WriteActionButtonsContainer from  '../containers/write/WriteActionButtonsContainer';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    );
};

export default WritePage;