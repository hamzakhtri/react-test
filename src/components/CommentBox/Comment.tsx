import { Button, Dropdown, Menu, Input } from 'antd';
import { EllipsisOutlined, SendOutlined } from '@ant-design/icons';
import userAvatar from "../../assets/images/user.png"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserComment, updateUserComment } from '../../store/features/post/postSlice';
import { RootState } from '../../store/features/types';

interface Comment {
    commentId: string;
    createdAt: number;
    commentContent: string;
    commentAuthor: string;
    commentAuthorEmail: string;
    postId: string;
}

interface CommentBoxProps {
    comment: Comment;
}

interface CurrentUser {
    username: string;
    email: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {


    const [commentContent, setCommentContent] = useState(comment.commentContent)
    const [commentEditMode, setCommentEditMode] = useState(false);
    const currentUser = useSelector((state: RootState) => state.user.currentUser) as CurrentUser;
    const dispatch = useDispatch();


    // toggle comment edit mode 

    const toggleCommentEditMode = () => {
        setCommentEditMode((prev) => !prev);
    };

    // update Commetn 

    const updateComment = () => {
        dispatch(updateUserComment({ commentContent, commentId: comment.commentId, postId: comment.postId }))
        setCommentEditMode(false);
    }

    // delete comment 

    const deleteComment = () => {
        dispatch(deleteUserComment({ commentId: comment.commentId, postId: comment.postId }));
    }

    const menu = (
        <Menu>
            <Menu.Item key="edit" onClick={toggleCommentEditMode}>Edit</Menu.Item>
            <Menu.Item key="delete" onClick={deleteComment}>Delete</Menu.Item>
        </Menu>
    );


    return (
        <div className="flex items-start mb-3 rounded p-3 mt-3">
            {/* Left section - User avatar and name */}
            <div className="flex-shrink-0 mr-3">
                <img src={userAvatar} width={30} className="rounded-full" alt="user" />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{comment.commentAuthor}</span>
                    {/* Three dots only show eidt and delte option to the comment author*/}
                    {comment.commentAuthorEmail === currentUser?.email && (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="text" icon={<EllipsisOutlined />} />
                        </Dropdown>
                    )}

                </div>
                {/* Comment content */}
                <div className='flex mr-3'>
                    <Input
                        readOnly={!commentEditMode}
                        placeholder="What's on your mind?"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        autoFocus={false}
                        className={`rounded-xl bg-gray-200 ${commentEditMode ? "" : "border-none active:border-none focus:shadow-none "}`}
                    />
                    {commentEditMode && <Button type="primary" onClick={updateComment} icon={<SendOutlined />} className='bg-blue-500' />}
                </div>
            </div>
        </div>
    );
};

export default CommentBox;
