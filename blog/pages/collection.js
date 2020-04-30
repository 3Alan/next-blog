import Header from '../components/header';
import Head from 'next/head';
import Link from 'next/link';
import Author from '../components/author';
import Footer from '../components/footer';
import collections from '../public/static/style/pages/collections.module.css';
import Axios from 'axios';
import Api from '../utils/api';
import { useState, useEffect } from 'react';
import { Row, Col, List, Typography, Breadcrumb } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';

const Collection = (props) => {
  const { Paragraph } = Typography;
  const [collectionList, setCollectionList] = useState(props.data);
  const [title, setTitle] = useState(collectionList[0].typeName);
  const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );
  const hasImg = true;

  return (
    <div>
      <Head>
        <title>{title}专题文章</title>
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
              header={
                <div className="article-list-header">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="/collections">专题</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{title}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              }
              itemLayout="vertical"
              dataSource={collectionList}
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
                        as={`/detail/${item.id}`}
                        href={{ pathname: '/detail', query: { id: item.id } }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    }
                    description={
                      <Paragraph ellipsis={{ rows: 4, expandable: true }}>
                        {item.introduction}
                      </Paragraph>
                    }
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

Collection.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await Axios(Api.getCollectionById(id));
  return res.data;
};

export default Collection;
