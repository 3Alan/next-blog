import Header from '../components/header';
import Head from 'next/head';
import collections from '../public/static/style/pages/collections.module.css';
import Author from '../components/author';
import Footer from '../components/footer';
import Axios from 'axios';
import Api from '../utils/api';
import { useState } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import Link from 'next/link';

const Collections = (props) => {
  const [collectionList] = useState(props.data);

  return (
    <div>
      <Head>
        <title>专题</title>
      </Head>
      <Header />
      <Row justify="center" type="flex" className="container">
        <Col
          className="content-container"
          xs={23}
          sm={23}
          md={16}
          lg={17}
          xl={15}
        >
          <Breadcrumb className={collections.breadcrumb}>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>专题</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ overflow: 'hidden' }}>
            <Row className={collections.content} gutter={[16, 16]}>
              {collectionList.map((item, index) => (
                <Link
                  href={`/collection?id=${item.id}`}
                  key={index}
                >
                  <Col
                    className={collections['content-card']}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className={collections['content-card-mask']}>
                      <div style={{backgroundImage: `url(${item.image})`}}></div>
                    </div>
                    <div className={collections['content-card-text']}>
                      <span className={collections['content-card-text-name']}>
                        {item.name}
                      </span>
                      <span>{item.num || 0}篇文章</span>
                      <span className={collections['content-card-text-time']}>
                        最新更新时间：{item.time || '暂无文章'}
                      </span>
                    </div>
                  </Col>
                </Link>
              ))}
            </Row>
          </div>
        </Col>
        <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Collections.getInitialProps = async () => {
  const res = await Axios(Api.getSpecialList());
  return res.data;
};

export default Collections;
