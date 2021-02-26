import React, {useState, useEffect} from "react";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { writeComment } from '../../modules/post';
import ShowComments from '../../components/comments/ShowComments';
import Button from '../../components/common/Button';
import styled from 'styled-components';
import Responsive from '../../components/common/Responsive';
import palette from '../../lib/style/palette';

const CoDiv = styled(Responsive)`
    border-top: 1px solid ${palette.gray[2]};
    margin-top : 5rem;
    padding-bottom : 5rem;
`;
const Comment = styled.div` 
    display: flex;
    width : 100%;
    justify-content: center;
    align-items: center;
`;


const Cbutton = styled(Button)`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
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

`;
const Input = styled.input`
    width: 100%;
    border: 1px solid #E8E6E6;
    padding-left: .8em;
    font-size: 1rem;
    font-weight: bold;
    &:focus{
        outline:none;
    }
`;
const CommentContainer = ({ match }) => {
    const [CommentValue, setCommentValue] = useState("");
    const [newPost, setNew] = useState({});
    const [arrSize, setArr] = useState(0);
    const {user, post} = useSelector(({ user, post }) => ({
        user: user.user,
        post: post.post,
    }));
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        const username = user.username;
        const _id = post._id;
        dispatch(writeComment({text: CommentValue, username: username, id: _id}));
        setCommentValue('');
        
    };
    useEffect(() => {
        if(post){    
            setNew(post);
            setArr(post.comments.length);
        }
    }, [post])
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    return(
        <CoDiv>
            <div style={{margin:'3% 0%', color:'black', fontSize:'1.2rem'}}>댓글 {arrSize}</div>
            <div>
            <Comment>
                <form style={{ display: 'flex', width: '100%', height: '100px' }} onSubmit={onSubmit} >
                <Input
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="댓글을 작성하세요"
                />
                <br />
                </form>
            </Comment>
            <br/>
            <Cbutton style={{float: 'right' }}onClick={onSubmit}>댓글 작성</Cbutton>
            </div>
           {newPost && <ShowComments post={newPost}/> }

        </CoDiv>
    )
};  
export default withRouter(CommentContainer);
