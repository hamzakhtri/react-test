import { Card, Input, Button, Radio } from 'antd';
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import userAvatar from "../../assets/images/user.png"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features/types';
import { addUserPost } from '../../store/features/post/postSlice';
import Swal from 'sweetalert2';

interface User {
    username: string;
}

const { TextArea } = Input;

const PostForm = () => {

    const [feeling, setFeelings] = useState("");
    const [postContent, setPostContent] = useState("");
    const currentUser = useSelector((state: RootState) => state.user.currentUser) as User;
    const dispatch = useDispatch();
    

    // adding post to redux store 
    const addPost = () => {
        if(!postContent || !feeling){
            Swal.fire({
                title: "Fields Required",
                text: "feeling and Text Required",
                icon: "error"
            });
            return 
        }
        const post = {
            postAuthor : currentUser.username,
            postContent : postContent,
            feeling: feeling,
        }
        dispatch(addUserPost(post));
        setFeelings("");
        setPostContent("");
        
    }

    return (
        <div>
            <Card className="bg-white shadow-md">
                <div className="flex items-center">
                    <img src={userAvatar} alt="user" width={50} />
                    <div className="ml-4 w-full">
                        <TextArea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            rows={2}
                            placeholder="What's on your mind?" />
                    </div>
                </div>
                <div className="flex justify-between mt-4 items-center">
                    <div><strong>Feelings:</strong></div>
                    <Radio.Group onChange={(e) => setFeelings(e.target.value)} value={feeling}>
                        <Radio.Button value="happy"><SmileOutlined /> Happy</Radio.Button>
                        <Radio.Button value="sad"><FrownOutlined /> Sad</Radio.Button>
                        <Radio.Button value="neutral"><MehOutlined /> Neutral</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" className='bg-[#FA6450] hover:bg-[#3CC8B4] duration-300' onClick={addPost}>Post</Button>
                </div>
            </Card>
        </div>
    );
};

export default PostForm;
