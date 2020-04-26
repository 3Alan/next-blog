import React from 'react';
import { Row, Col, Menu, Affix } from 'antd';
import header from '../public/static/style/components/header.module.css';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Header = () => {
  return (
    <Affix offsetTop={0}>
      <div className={header.header}>
        <Row type="flex" justify="center" gutter={32}>
          <Col xs={23} sm={23} md={14} lg={15} xl={13}>
            <span className={header.title}>Alan</span>
            <span className={header.title}>专注于前dsfdsfsdfd端开发</span>
          </Col>
          <Col xs={0} sm={0} md={9} lg={8} xl={6}>
            <Menu mode="horizontal">
              <Menu.Item key="home">
                <Link href="/">
                  <a>
                    <HomeOutlined />
                    首页
                  </a>
                </Link>
              </Menu.Item>

              <Menu.Item key="life">
                <HomeOutlined />
                生活
              </Menu.Item>
              <Menu.Item key="blog">
                <HomeOutlined />
                博文
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </Affix>
  );
};

export default Header;
