import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/style/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  margin-top: 5em;
  h1 {
    font-size: 2.5rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, levels, loading, actionButtons }) => {

  if(error) {
        if(error.response && error.response.status === 404){
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>;
    }
    // 로딩중이거나, 아직 포스트 데이터가 없을 시
    if (loading || !post) {
        return null;
    }
    const { title, body, user, publishedDate } = post;
  if(!levels){
    return null;
  }
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo 
            username = {user.username}
            userlevel = {levels.level}
            publishedDate = {publishedDate}
            hasMarginTop
        />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;