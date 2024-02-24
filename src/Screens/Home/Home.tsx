import { Col,  Row } from 'antd';
import userAvatar from "../../assets/images/user.png"
import { Card,  Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import PostForm from '../../components/PostForm/PostForm';

function Home() {
    return (
        <div className="container mx-auto my-10">
            <Row>
                <Col xs={24} sm={24} md={10} lg={8}>
                    <div className="p-6">
                        <Card className='shadow-md'>
                            <div className="text-center">
                                <img src={userAvatar} width={60} alt="user" className='mx-auto' />
                                <h4 className="mt-4 text-2xl font-semibold">John Doe</h4>
                                <p>john.doe@example.com</p>
                            </div>
                            <div className="text-center mt-6">
                                <Button type="primary" className='bg-[#FA6450] hover:bg-[#3CC8B4] duration-300' icon={<LogoutOutlined />}>
                                    Logout
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={14} lg={16}>
                    <div className="p-6">
                        <PostForm/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home