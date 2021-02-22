import React, {useState, useEffect} from "react";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { writeComment, readComment } from '../../modules/comment';
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
const Input = styled.input`
    width : 100%;
`;

const Cbutton = styled(Button)`
    width: 15%;
    height: 52px;
    margin-left: 3%;
    @media (max-width: 768px) {
        width: 20%;
    }
`;

const CommentContainer = () => {
    const [CommentValue, setCommentValue] = useState("");
    const [arrSize, setSize] = useState(0);
    const [updateCheck, setCheck] = useState(false);
    const {user, post} = useSelector(({ user, post }) => ({
        user: user.user,
        post: post.post,
    }));
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        const username = user.username;
        const _id = post._id;
        const userlevel = user.level;
        dispatch(writeComment({text: CommentValue, username: username,level:userlevel, id: _id}));
        dispatch(readComment({_id, username}));
        setCheck(true);
        //안됨 newComment 바로 렌더링 되게 해야함
        setCommentValue('');
        
    };
    useEffect(() => {
        if(post){
            setSize(post.comments.length);
        }
    },[post]);

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    return(
        <CoDiv>
            <div style={{margin:'5% 0%', color:'black', fontSize:'1.2rem'}}>댓글 {arrSize}</div>
            <Comment>
                <form style={{ display: 'flex', width: '100%', height: '52px' }} onSubmit={onSubmit} >
                <input
                    style={{ width: '100%'}}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="댓글을 달아주세요"
                />
                <br />
                </form>
                <Cbutton onClick={onSubmit}>등록</Cbutton>
            </Comment>
           {post && <ShowComments /> }
        </CoDiv>
    )
};  
export default withRouter(CommentContainer);
