import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Api from '../utils/api';
import Header from '../components/header';
import Author from '../components/author';
import Footer from '../components/footer';
import { Row, Col, List, Tag, Typography } from 'antd';
import {
  EyeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const Home = (props) => {
  useEffect(() => {
    console.log(props);
  });
  const { Paragraph } = Typography;
  const [color, setColor] = useState('red');
  const [articleList, setArticleList] = useState(props.data);
  const hasImg = true;

  const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );

  function goToPageA() {
    Router.push({
      pathname: '/pageA',
      query: {
        title: 'click push title',
      },
    });
  }

  function changeColor() {
    setColor(color === 'red' ? 'blue' : 'red');
  }

  return (
    <div>
      <Head>
        <title>首页|Alan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="container">
        <Row justify="center" type="flex">
          <Col
            className="left-container"
            xs={23}
            sm={23}
            md={16}
            lg={17}
            xl={14}
          >
            <List
              header={<div className="article-list-header">最新文章</div>}
              itemLayout="vertical"
              dataSource={articleList}
              renderItem={(item) => (
                <List.Item
                  className="list-item"
                  key={item.title}
                  actions={[
                    <IconText
                      icon={CalendarOutlined}
                      text={item.releaseTime}
                      key="list-vertical-time-o"
                    />,
                    <IconText
                      icon={EyeOutlined}
                      text={item.viewCount}
                      key="list-vertical-view-o"
                    />,
                    <Tag color="green">vue</Tag>
                  ]}
                  extra={
                    hasImg ? (
                      <img
                        className="list-image"
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    ) : (
                      ''
                    )
                  }
                >
                  <List.Item.Meta
                    title={
                      <Link
                        href={{ pathname: '/detail', query: { id: item.id } }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    }
                  description={<Paragraph ellipsis={{ rows: 4, expandable: true }}>{item.intruction}</Paragraph>}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={5}>
            <Author />
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await Axios(Api.getArticleList());
  return res.data;
};

export default Home;
