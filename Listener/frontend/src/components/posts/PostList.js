import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/style/palette';
import SubInfo from '../common/SubInfo';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5em;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
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


const PostItem = ({ post }) => {
  const [usrlevel, setLevel] = useState('');
  const { publishedDate, user, title, body, _id } = post;


  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`} style={{color: 'black', textDecoration: 'none'}}>{title}</Link>
      </h2>
      {<SubInfo 
        username ={user.username} 
        userlevel={usrlevel}
        publishedDate={new Date(publishedDate)}/>}
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if(posts && posts.length == 0){
      setCheck(true);   //게시글 존재 여부 판단
    } else {
      setCheck(false);
    }
  }, [posts])

  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }
  
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
      {showWriteButton && (
          <Button to="/write" style={{textDecoration: 'none', color: 'white'}}>
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {check && 
        <div style={{fontSize: '1.5rem', fontWeight: 'bold', padding:'4% 0'}}>
          게시글이 없습니다.</div>}

      {!loading && posts && (
        <div>
         {posts.map(post => (
          <PostItem post={post} key={post._id} />
        ))}
        </div>
      )}

    </PostListBlock>
  );
};

export default PostList;