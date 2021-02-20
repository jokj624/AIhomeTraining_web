import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import NavContainer from '../components/common/Navbar';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import styled from "styled-components";


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