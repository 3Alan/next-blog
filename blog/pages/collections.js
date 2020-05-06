import Header from '../components/header';
import Head from 'next/head';
import collections from '../public/static/style/pages/collections.module.css';
import Author from '../components/author';
import Footer from '../components/footer';
import Axios from 'axios';
import Api from '../utils/api';
import { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Affix } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Collections = (props) => {
  const collectionList = [
    {
      id: 1,
      img:
        'https://ae01.alicdn.com/kf/HTB1eE2mXPlxYKJjSZFuq6yYlVXay/Laeacco-Seaside-Wooden-View-Bridge-Platform-Scenic-Photography-Backgrounds-Vinyl-Custom-Photographic-Backdrops-For-Photo-Studio.jpg_640x640.jpg',
      collectionName: 'vue专题',
      articleNum: 10,
    },
    {
      id: 2,
      img:
        'https://ae01.alicdn.com/kf/HTB1eE2mXPlxYKJjSZFuq6yYlVXay/Laeacco-Seaside-Wooden-View-Bridge-Platform-Scenic-Photography-Backgrounds-Vinyl-Custom-Photographic-Backdrops-For-Photo-Studio.jpg_640x640.jpg',
      collectionName: 'react专题',
      articleNum: 15,
    },
    {
      id: 3,
      img:
        'https://ae01.alicdn.com/kf/HTB1eE2mXPlxYKJjSZFuq6yYlVXay/Laeacco-Seaside-Wooden-View-Bridge-Platform-Scenic-Photography-Backgrounds-Vinyl-Custom-Photographic-Backdrops-For-Photo-Studio.jpg_640x640.jpg',
      collectionName: 'javascript专题',
      articleNum: 40,
    },
  ];

  return (
    <div>
      <Head>
        <title>专题</title>
      </Head>
      <Header />
      <Row justify="center" type="flex" className="container">
        <Col
          className={`left-container ${collections.container}`}
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
                      <div style={{backgroundImage: `url('https://icapps.com/sites/default/files/styles/wide_image/public/React%20Native%20image.jpg?itok=v9IZyGx9')`}}></div>
                    </div>
                    <div className={collections['content-card-text']}>
                      <span className={collections['content-card-text-name']}>
                        {item.collectionName}
                      </span>
                      <span>{item.articleNum}篇文章</span>
                      <span className={collections['content-card-text-time']}>
                        最新更新时间：2020-04-30
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

export default Collections;
