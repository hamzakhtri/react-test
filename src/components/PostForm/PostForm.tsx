import { Card, Input, Button, Radio } from 'antd';
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import userAvatar from "../../assets/images/user.png"
import { useState } from 'react';

const { TextArea } = Input;

const PostForm = () => {

    const [feeling, setFeelings] = useState("");

  return (
    <div>
      <Card className="bg-white shadow-md">
        <div className="flex items-center">
          <img src={userAvatar} alt="user" width={50} />
          <div className="ml-4 w-full">
            <TextArea rows={2} placeholder="What's on your mind?" />
          </div>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <div><strong>Feelings:</strong></div>
          <Radio.Group onChange={(e)=>setFeelings(e.target.value)} value={feeling}>
            <Radio.Button value="happy"><SmileOutlined /> Happy</Radio.Button>
            <Radio.Button value="sad"><FrownOutlined /> Sad</Radio.Button>
            <Radio.Button value="neutral"><MehOutlined /> Neutral</Radio.Button>
          </Radio.Group>
          <Button type="primary" className='bg-[#FA6450] hover:bg-[#3CC8B4] duration-300'>Post</Button>
        </div>
      </Card>
    </div>
  );
};

export default PostForm;
