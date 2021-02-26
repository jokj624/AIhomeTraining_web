import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentContainer from '../containers/comments/CommentContainer';
import { Helmet } from 'react-helmet-async';
import FooterContainer from '../containers/common/FooterContainer';

const PostPage = () => {
    return(
        <>
        <Helmet>
            <title>글 보기</title>
        </Helmet>
        <HeaderContainer />
        <NavContainer />
        <PostViewerContainer />
        <CommentContainer />
        <FooterContainer />
        </>    
    );
};

export default PostPage;