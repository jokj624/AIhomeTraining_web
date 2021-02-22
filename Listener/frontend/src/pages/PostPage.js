import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentContainer from '../containers/comments/CommentContainer';


const PostPage = () => {
    return(
        <>
        <HeaderContainer />
        <NavContainer />
        <PostViewerContainer />
        <CommentContainer />
        </>    
    );
};

export default PostPage;