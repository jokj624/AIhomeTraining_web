import React, { useState } from 'react';
import{ useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import palette from '../../lib/style/palette';
import { searchPosts } from '../../modules/posts';

const Wrapper = styled(Responsive)`
    form {
        display: flex;
        width : 100%;
        height : 40px;
        justify-content: flex-end;
    }
    select{
        width: 100px;
        height: 100%;
        border: none;
        background: white;
        border: 1px solid #E8E6E6;
    }

    input{
        margin : 0 15px;
        width : 250px;
        height: 100%;
        border: 1px solid #E8E6E6;
        padding-left: .8em;
        font-size: 1rem;
        &:focus{
            outline:none;
        }
    }
    @media (max-width: 768px) {
        select{
            width: 60px;
        }
        input{
            width: 200px;
        }
    }
`;
const Cbutton = styled(Button)`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    width: 65px;
    height: 40px;
    font-weight: bold;
    border: none;
    outline: none;
    font-size: 1rem;
    cursor: pointer;
    background: ${palette.blue[7]};
    color: white;
    &:hover {
        background: ${palette.blue[6]};
        color: white;
    }
    & + & {
        margin-left: 0.25rem;
    }
    @media (max-width: 768px) {
        width: 55px;
    }
`;

const SearchPostContainer = ({ location }) => {
    const [value, setValue] = useState(""); 
    const [options, setOptions] = useState("title");

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValue(e.currentTarget.value);
    };
    const selectHandle = (e) => {
        setOptions(e.currentTarget.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        
        dispatch(searchPosts({ page: page, option: options, content: value }));
        setValue('');
    };
    return (
        <>
        <Wrapper>
            <form method="get" onSubmit={onSubmit}>
            <select value={options} onChange={selectHandle}>
                <option value="title">제목</option>
                <option value="body">내용</option>
                <option value="title_body">제목+내용</option>
            </select>
            <input 
                type="text" name="searchText"
                onChange={ handleChange }
                value={value}
                placeholder="검색어를 입력하세요"/>
            <div>
                <Cbutton type = "submit" onClick={onSubmit}>검색</Cbutton>
            </div>
            </form>
        </Wrapper>
        </>
    )
};

export default withRouter(SearchPostContainer);