import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import { Helmet } from 'react-helmet-async';
import FooterContainer from '../containers/common/FooterContainer';


const PostListPage = () => {
  return (
    <>
    <Helmet>
      <title>게시판</title>
    </Helmet>
      <HeaderContainer />
      <NavContainer />
      <PostListContainer />
      <PaginationContainer />
      <FooterContainer />
    </>
  );
};

export default PostListPage;