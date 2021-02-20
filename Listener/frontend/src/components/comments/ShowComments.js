import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/style/palette';
import Comment from '../common/Comment';
import readComment from '../../modules/comment';
import { useDispatch, useSelector } from 'react-redux';

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

const ShowComments = ({newComment}) => {
    const [arr, setArr] = useState([]);
    const {post, com} = useSelector(({ post, comment }) => ({
        post: post.post,
        com: comment.com,
    }));
    
    useEffect(() => {
        if(post){
            if(newComment){
                setArr(arr.concat(newComment));
            }
            console.log(post);
            setArr(post.comments);
        }
    }, [post, arr]);
    /*const dispatch = useDispatch();
    const { comment } = useSelector(({ comment }) => ({
        comment: comment.com,
    }));*/
    return (
      <div>
        {arr.map(comments => (
          <PostItem comments={comments} />
        ))}
      </div>
    );
};

export default ShowComments;