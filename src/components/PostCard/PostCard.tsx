import { Card, Button, Input, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, LikeOutlined, LikeFilled, CommentOutlined, ShareAltOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import userAvatar from "../../assets/images/user.png"
import { useDispatch, useSelector } from 'react-redux';
import { addUserComment, addUserLike, deleteUserPost, removeUserLike, updateUserPost } from '../../store/features/post/postSlice';
import { RootState } from '../../store/features/types';
import Picker from "emoji-picker-react"
import CommentBox from '../CommentBox/Comment';

interface Post {
    postId: string;
    postContent: string;
    postAuthor: string;
    feeling: string;
    createdAt: number;
    numberOfLikes: number;
    postAuthorEmail: string;
    comments: Comment[];
    likedUsers: string[];
}

interface Comment {
    commentId: string;
    createdAt: number;
    commentContent: string;
    commentAuthor: string;
    commentAuthorEmail: string;
    postId: string;
}

interface PostCardProps {
    post: Post;
}

interface User {
    username: string;
    email: string
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {

    const [showCommentSection, setShowCommentSection] = useState(false);
    const [postEditMode, setPostEditMode] = useState(false);
    const [postContent, setPostContent] = useState(post.postContent);
    const [comment, setComment] = useState("");
    const currentUser = useSelector((state: RootState) => state.user.currentUser) as User;
    // it will show by defulat liked if this user allready liked than show liked button by default 
    const [liked, setLiked] = useState(post.likedUsers.includes(currentUser.email));

    // show emoji picker state 

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const dispatch = useDispatch();

    // function to handle like increament and decreament

    const handleLike = () => {
        const { postId } = post;
        // Check if currentUser exists and has an email property
        if (currentUser && currentUser.email) {
            const isLiked = post.likedUsers.includes(currentUser.email);
            if (!isLiked) {
                setLiked(true);
                dispatch(addUserLike({ postId, currentUserEmail: currentUser.email }));
            } else {
                setLiked(false);
                dispatch(removeUserLike({ postId, currentUserEmail: currentUser.email }));
            }
        }
    };


    const onEmojiClick = (emojiObject: any) => {
        setComment(comment + emojiObject.emoji);
        setShowEmojiPicker(false);
    }

    const handleComment = () => {
        setShowCommentSection(!showCommentSection);
    };

    const togglePostEditMode = () => {
        setPostEditMode((prev) => !prev);
    };

    // update post function 

    const updatePost = () => {
        const { postId } = post;
        dispatch(updateUserPost({ postContent: postContent, postId: postId }));
        setPostEditMode(false);
    }

    // delte post 

    const deletePost = () => {
        const { postId } = post;
        dispatch(deleteUserPost(postId));
    }


    // add comment to the post 

    const addComment = () => {
        const { postId } = post;
        dispatch(addUserComment({ commentContent: comment, postId: postId, commentAuthor: currentUser.username, commentAuthorEmail: currentUser.email }));
        setComment("");
    }

    // 3 dot post menu 

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={togglePostEditMode}>Edit Post</Menu.Item>
            <Menu.Item key="2" onClick={deletePost}>Delete Post</Menu.Item>
        </Menu>
    );

    return (
        <Card className="bg-white shadow-md mt-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={userAvatar} width={50} className='mr-4' alt="user" />
                    <div>
                        <span className="ml-2 text-lg uppercase font-medium">{post.postAuthor}</span>
                        <p className="ml-2 uppercase text-xs">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                {/* if user current user is owner of post than show edit and delete buttotn  */}
                {post.postAuthorEmail === currentUser?.email &&
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button type="text" icon={<EllipsisOutlined />} />
                    </Dropdown>}
            </div>
            <div className="my-4">
                <p className='font-medium'>{post.postAuthor[0].toUpperCase() + post.postAuthor.slice(1)} felling {post.feeling}</p>
            </div>
            <div className="mt-4 flex">
                <Input
                    readOnly={!postEditMode}
                    placeholder="What's on your mind?"
                    value={postContent}
                    autoFocus={false}
                    onChange={(e) => setPostContent(e.target.value)}
                    className={` ${postEditMode ? "" : "border-none active:border-none focus:shadow-none "}`} />
                {postEditMode && <Button type="primary" onClick={updatePost} icon={<SendOutlined />} className='bg-blue-500' />}
            </div>
            <div className="flex justify-evenly mt-4">
                <Button
                    type="text"
                    icon={liked ? <LikeFilled style={{ color: 'blue' }} /> : <LikeOutlined />}
                    onClick={handleLike}
                >
                    Like &nbsp; {post.numberOfLikes}
                </Button>
                <Button type="text" icon={<CommentOutlined />} className="mx-2" onClick={handleComment}>
                    Comment
                </Button>
                <Button type="text" icon={<ShareAltOutlined />}>
                    Share
                </Button>
            </div>
            {showCommentSection && (
                <div>
                    <div className="mt-4 flex items-center">
                        <Input
                            placeholder="Write your comment"
                            className="flex-1 mr-2"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <span
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="cursor-pointer hover:text-blue-500 mr-2"
                        >
                            <SmileOutlined style={{fontSize: "20px"}} />
                        </span>
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            className="bg-blue-500"
                            disabled={!comment}
                            onClick={addComment}
                        >
                            Comment
                        </Button>
                    </div>
                    {showEmojiPicker && (
                        <div className='flex justify-end w-full relative'>
                            <div className='w-96 absolute h-52'>
                                <Picker
                                    style={{ width: '100%', height: "350px" }}
                                    onEmojiClick={onEmojiClick}
                                />
                            </div>
                        </div>
                    )}
                    {post.comments.length > 0 && post.comments.map((comment) => {
                        return <CommentBox comment={comment} />
                    })}
                </div>
            )}
        </Card>
    );
}

export default PostCard;
