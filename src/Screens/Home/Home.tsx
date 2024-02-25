import { Col, Row } from 'antd';
import userAvatar from "../../assets/images/user.png"
import { Card, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import PostForm from '../../components/PostForm/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features/types';
import { addCurrentUser } from '../../store/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PostCard from '../../components/PostCard/PostCard';

interface CurrentUser {
    username: string;
    email: string;
}


function Home() {


    const currentUser = useSelector((state: RootState) => state.user.currentUser) as CurrentUser;
    const allPosts = useSelector((state: RootState) => state.post.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();


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

    // if current user Null do not render and retun only 

    if (currentUser === null) {
        return
    }


    return (
        <div className="container mx-auto my-10">
            <Row>
                <Col xs={24} sm={24} md={10} lg={8}>
                    <div className="p-6">
                        <Card className='shadow-md'>
                            <div className="text-center">
                                <img src={userAvatar} width={60} alt="user" className='mx-auto' />
                                <h4 className="mt-4 text-2xl font-semibold">{currentUser && currentUser.username}</h4>
                                <p>{currentUser && currentUser.email}</p>
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
