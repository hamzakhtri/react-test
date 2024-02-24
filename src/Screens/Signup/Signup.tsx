import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import logo from "../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUser } from '../../store/features/user/userSlice';
import { addUser } from '../../store/features/user/userSlice';
import { FormInstance } from 'antd/lib/form';
import { RootState } from '../../store/features/types';
import Swal from 'sweetalert2';



function Signup() {

    const [form] = Form.useForm<FormInstance>();
    const allUsers = useSelector((state: RootState) => state.user.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //function to signup user and add user info to the redux store

    const signUpUser = async (values: any) => {
        // Check if user already registered or not
        const emailExists = allUsers.some(user => user.email === values.email);
        if (emailExists) {
            Swal.fire({
                title: "Auth Error",
                text: "Email Already Registered",
                icon: "error"
            });
        } else {
            dispatch(addUser(values));
            form.resetFields();

            // also setting current user to redux store 

            const {email, username} = values;
            dispatch(addCurrentUser({email, username}));

            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Account Created",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/")
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
                        <h3 className='mt-4 mb-9 text-2xl font-medium'>Sign Up</h3>
                    </div>
                    <Form
                        name="normal_signup"
                        className="signup-form"
                        initialValues={{ remember: true }}
                        onFinish={signUpUser}
                        form={form}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon p-2 text-lg" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon p-2 text-lg" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon p-2 text-lg" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item className='text-center'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button mx-auto my-2 block h-auto bg-[#FA6450] hover:bg-[#3CC8B4] text-lg w-full duration-300 shadow-md">
                                Sign Up
                            </Button>
                            Already Have Account <Link to="/">Sign In</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
