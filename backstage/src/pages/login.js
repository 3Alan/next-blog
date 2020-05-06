import React, { useState } from 'react';
import { Spin, Card, Input, Button, message } from 'antd';
import '../static/style/login.css';
import Axios from 'axios';
import Api from '../utils/api';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = (props) => {
  const [isLogining, setIsLoginging] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    setIsLoginging(true);
    if (!username) {
      message.warning('请输入用户名');
      return ;
    } else if (!password){
      message.warning('请输入密码');
      return ;
    }
    try {
      const res = await Axios({
        method: 'post',
        url: Api.login(),
        data: { username, password }
      });
      if (res.data.code === '0001') {
        localStorage.setItem('token', res.data.token);
        props.history.push('backstage/updateArticle');
      } else {
        message.error(res.data.msg);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setIsLoginging(false);
    }
    setIsLoginging(false);
  }
  return (
    <div className="container">
      <Spin spinning={isLogining}>
        <Card title="Alan'Blog Management" className="login-container">
          <Input placeholder="username" size="large" prefix={<UserOutlined />} value={username} onChange={(e) => {setUsername(e.target.value)}} className="input-component" />
          <Input.Password placeholder="password" size="large" prefix={<LockOutlined />} value={password} onChange={(e) => {setPassword(e.target.value)}} className="input-component" />
          <Button type="primary" size="large" block onClick={login}>Login in</Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
