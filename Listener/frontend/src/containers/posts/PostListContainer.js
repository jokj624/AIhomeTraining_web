import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import SearchPostContainer from './SearchPostContainer';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const { username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ username, page }));
  }, [dispatch, location.search]);

  return (
    <>
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
    <SearchPostContainer />
    </>
  );
};

export default withRouter(PostListContainer);