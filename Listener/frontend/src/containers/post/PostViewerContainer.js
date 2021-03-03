import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';
import { findLevel, unloadLevel } from '../../modules/level';

const PostViewerContainer = ({ match, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId, username } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user, levels } = useSelector(({ post, loading, user, level }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user,
    levels: level.levelInfo,
  }));

  useEffect(() => {
    dispatch(readPost(postId)); 
    dispatch(findLevel({username}));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
      dispatch(unloadLevel());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
      dispatch(setOriginalPost(post));
      history.push('/write');
  };
  
  const onRemove = async () => {
    try{
      await removePost(postId);
      history.push('/postlist');
    }catch(e){
      console.log(e);
    }
  };
  const ownPost = (user && user._id) === (post && post.user._id);
  return <PostViewer post={post} loading={loading} error={error} levels={levels} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />} />;
};

export default withRouter(PostViewerContainer);