import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/style/palette';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../common/Comment';
import { readComment } from '../../modules/comment';

const PostItemBlock = styled.div`
  margin-top:3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ comments }) => {
    const { text, user, level, publishedDate,} = comments;
    return (
      <PostItemBlock>
        <Comment
          username ={user} 
          level = {level}
          text={text}
          publishedDate={new Date(publishedDate)} />
      </PostItemBlock>
    );
};

const ShowComments = () => {
    const [arr, setArr] = useState([]);
    const [len, setLen] = useState(0);
    const {post, com} = useSelector(({ post, comment }) => ({
        post: post.post,
        com: comment.com,
    }));
    const dispatch = useDispatch();
    useEffect(()=> {
      if(post)   setLen(post.comments.length);
    }, []);
    useEffect(() => {
      if(post){
        const { _id, title } = post;
        dispatch(readComment({_id, title}));
        if(com)   setLen(com.length);
      }
    }, [len]);
    useEffect(() => {
      if(com){
        setArr(com);
      }
    });
    return (
      <div>
        {arr&& arr.map(comments => (
          <PostItem comments={comments} />
        ))}
        {com && !com.length && <div>댓글이 없습니다.</div> } 
      </div>
    );
};

export default ShowComments;