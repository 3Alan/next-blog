import React, { useState } from 'react';
import { Spin, Card, Input, Button } from 'antd';
import '../static/style/login.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [isLogining, setIsLoginging] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    setIsLoginging(true);
    setTimeout(() => {
      setIsLoginging(false)
    }, 1000)
  }
  return (
    <div className="container">
      <Spin spinning={isLogining}>
        <Card title="Alan'Blog Management" className="login-container">
          <Input placeholder="username" size="large" prefix={<UserOutlined />} onChange={(e) => {setUsername(e.target.value)}} className="input-component" />
          <Input.Password placeholder="password" size="large" prefix={<LockOutlined />} onChange={(e) => {setPassword(e.target.value)}} className="input-component" />
          <Button type="primary" size="large" block onClick={login}>Login in</Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
