import React, { useState } from 'react';
import Author from '../components/author';
import Footer from '../components/footer';
import Axios from 'axios';
import Api from '../utils/api';
import Head from 'next/head';
import Header from '../components/header';
import { Row, Col, Timeline, BackTop } from 'antd';
import {
  UpOutlined,
} from '@ant-design/icons';

const Archive = (props) => {
  const [archiveList] = useState(props.data);
  return (
    <>
      <Head>
        <title>文章归档</title>
      </Head>
      <Header />
      <Row justify="center" type="flex" className="container">
        <Col
          className="content-container"
          style={{ padding: 30 }}
          xs={23}
          sm={23}
          md={16}
          lg={17}
          xl={15}
        >
          <Timeline mode="alternate">
            {archiveList.map((item,index) => (
              <Timeline.Item color="green" label={item.time} key={index+item.time}>
                {item.content}
              </Timeline.Item>
            ))}
          </Timeline>
        </Col>
        <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={4}>
          <Author />
        </Col>
      </Row>
      <BackTop>
        <div className="backtop">
          <UpOutlined />
        </div>
      </BackTop>
      <Footer />
    </>
  );
};

Archive.getInitialProps = async () => {
  const res = await Axios(Api.getArchive());
  return res.data;
};

export default Archive;
