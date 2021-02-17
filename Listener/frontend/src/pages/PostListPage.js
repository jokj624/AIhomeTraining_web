import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <NavContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;