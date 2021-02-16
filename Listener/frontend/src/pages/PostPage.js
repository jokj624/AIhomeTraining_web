import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPage = () => {
    return(
        <>
        <HeaderContainer />
        <NavContainer />
        <PostViewerContainer />
        </>    
    );
};

export default PostPage;