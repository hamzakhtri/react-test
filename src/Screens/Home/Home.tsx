import { Col, Row } from 'antd';
import userAvatar from "../../assets/images/user.png"
import { Card, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import PostForm from '../../components/PostForm/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features/types';
import { useCallback, useEffect, useState } from 'react';
import { addCurrentUser } from '../../store/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PostCard from '../../components/PostCard/PostCard';

interface User {
    username: string;
    email: string;
}


function Home() {

    const [userInfo, setUserInfo] = useState<User | null>(null);
    const currentUserEmail = useSelector((state: RootState) => state.user.currentUser) as string;
    const allUsers = useSelector((state: RootState) => state.user.users);
    const allPosts = useSelector((state: RootState) => state.post.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // getting current user information 

    const getUserInfo = useCallback(() => {
        const currentUser = allUsers.find(user => user.email === currentUserEmail);
        if (currentUser) {
            setUserInfo(currentUser);
            dispatch(addCurrentUser(currentUser));
        }
    }, [allUsers, currentUserEmail]);



    useEffect(() => {
        getUserInfo();
    }, [getUserInfo, currentUserEmail, allPosts])


    // logout user 

    const logout = async () => {
        dispatch(addCurrentUser(null));
        await Swal.fire({
            position: "center",
            icon: "success",
            title: "Loged Out",
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/");

    }



    return (
        <div className="container mx-auto my-10">
            <Row>
                <Col xs={24} sm={24} md={10} lg={8}>
                    <div className="p-6">
                        <Card className='shadow-md'>
                            <div className="text-center">
                                <img src={userAvatar} width={60} alt="user" className='mx-auto' />
                                <h4 className="mt-4 text-2xl font-semibold">{userInfo && userInfo.username}</h4>
                                <p>{userInfo && userInfo.email}</p>
                            </div>
                            <div className="text-center mt-6">
                                <Button onClick={logout} type="primary" className='bg-[#FA6450] hover:bg-[#3CC8B4] duration-300' icon={<LogoutOutlined />}>
                                    Logout
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={14} lg={16}>
                    <div className="p-6">
                        <PostForm />
                        {allPosts.length > 0 && allPosts.map((post) => (
                            <PostCard key={post.postId} post={post} />
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home;
