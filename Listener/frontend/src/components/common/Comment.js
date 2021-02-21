import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/style/palette';

const SubInfoBlock = styled.div`
  ${props =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray[6]};
  /* span 사이에 가운뎃점 문자 보여주기*/
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;
const Div = styled.div`
  padding-top: 5%;
  color: black;
`;

const Comment = ({ username, level, text, publishedDate, hasMarginTop }) => {
    return (
      <SubInfoBlock hasMarginTop={hasMarginTop}>
        <span>
          <b>
            {level}<h1> </h1>
            {username} 
            <span> {new Date(publishedDate).toLocaleDateString()}</span>
          </b>
          <Div>{text}</Div>
        </span>
      
      </SubInfoBlock>
    );
  };
  
  export default Comment;
  