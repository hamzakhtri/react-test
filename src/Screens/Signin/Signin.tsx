import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import logo from "../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/features/types';
import { addCurrentUser } from '../../store/features/user/userSlice';
import Swal from 'sweetalert2';
import { FormInstance } from 'antd/lib';

function Signin() {


    const [form] = Form.useForm<FormInstance>();
    const allUsers = useSelector((state: RootState) => state.user.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // first matching credeintails with registered users if available and authenticated
    // set the user to current user and navigate to home screen

    const signInUser = (values: any) => {
        const userAuthentication = allUsers.some((user) => user.email === values.email && user.password === values.password);
        if (userAuthentication) {
            const { email, username } = values;
            dispatch(addCurrentUser({ email, username }));
            form.resetFields();
            navigate("/home");
        }else{
            Swal.fire({
                title: "Auth Error",
                text: "Invalid Credentials",
                icon: "error"
            });
        }
    };
    return (

        <div className='auth-form'>
            <div className="container flex justify-center items-center mx-auto w-full h-screen">
                <div className='w-10/12 md:w-8/12 lg:w-4/12  bg-white shadow-xl shadow-gray-300 p-6 rounded-lg'>
                    <div className='flex justify-center my-5'>
                        <img src={logo} width={80} alt="" />
                    </div>
                    <div>
                        <h3 className='mt-4 mb-9 text-2xl font-medium'>Sign In</h3>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={signInUser}
                        form={form}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined
                                    className="custom-input site-form-item-icon p-2 text-lg" />}
                                placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined
                                    className="site-form-item-icon p-2 text-lg" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item className='text-center'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button mx-auto my-2 block h-auto bg-[#FA6450] hover:bg-[#3CC8B4] text-lg w-full duration-300 shadow-md">
                                Log in
                            </Button>
                            Don't Have Account <Link to="/signup">Sign Up</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signin