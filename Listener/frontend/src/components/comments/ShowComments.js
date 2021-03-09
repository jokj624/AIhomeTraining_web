import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/style/palette';
import Comment from '../common/Comment';


const PostItemBlock = styled.div`
  margin-top:2rem;
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
    const { text, user, publishedDate } = comments;
    return (
      <PostItemBlock>
        <Comment
          username ={user} 
          text={text}
          publishedDate={new Date(publishedDate)}
           />
      </PostItemBlock>
    );
};

const ShowComments = ( { post } ) => {
    const [arr, setArr] = useState([]);
   
    useEffect(()=> {
      setArr(post.comments);
    }, [post]);

    return (
      <div>
        {arr&& arr.map(comments => (
          <PostItem comments={comments} key={comments._id} />
        ))}
        {arr && !arr.length && <div style={{margin:'5% 0%', color:'black', fontSize:'1.2rem'}}>댓글이 없습니다.</div> } 
      </div>
    );
};

export default ShowComments;