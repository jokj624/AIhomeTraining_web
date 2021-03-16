import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 5em auto;
  display: flex;
  justify-content: space-between;

`;
const PageNumber = styled.div``;

const buildLink = ({ username, page }) => {
    const query = qs.stringify({ page });
    //return `/?${query}`;
    return username ? `/postlist/@${username}?${query}` : `/postlist/?${query}`;
};

const Pagination = ({ page, lastPage, username }) => {
  return (
    <>
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
    </>
  );
};

export default Pagination;