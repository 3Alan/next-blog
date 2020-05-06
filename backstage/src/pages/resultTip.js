import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function ResultTip(props) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const { title, location } = props.match.params;
    setTitle(title);
    setLocation(location);
  },[]);
  function backHome () {
    props.history.replace(`/backstage/${location}`);
  }
  return (
    <Result
      icon={<SmileOutlined />}
      title={title}
      extra={<Button type="primary" onClick={backHome}>好的</Button>}
    />
  );
}

export default ResultTip;
