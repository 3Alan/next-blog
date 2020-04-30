import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Affix } from 'antd';
import header from '../public/static/style/components/header.module.css';
import { HomeOutlined, ProfileOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { SubMenu } = Menu;

const Header = (props) => {
  const [selectedItem, setSelectedItem] = useState('home');

  function toggleMenu(e) {
    const { key } = e;
    setSelectedItem(key);
  }
  return (
    <Affix offsetTop={0}>
      <div className={header.header}>
        <Row type="flex" justify="center" gutter={16}>
          <Col xs={23} sm={23} md={14} lg={15} xl={13}>
            <div className={header.title}>
              <span>Alan</span>
              <span>专注于前端开发</span>
            </div>

            {/* 移动端适配 */}
            <Menu
              mode="horizontal"
              style={{ display: 'none' }}
              className={header['show-menu']}
              selectedKeys="home"
            >
              <SubMenu
                title={
                  <>
                    <MenuOutlined />
                  </>
                }
              >
                <Menu.Item key="home">
                  <Link href="/">
                    <a>
                      <HomeOutlined />
                      首页
                    </a>
                  </Link>
                </Menu.Item>

                <Menu.Item key="life">
                  <ProfileOutlined />
                  专题
                </Menu.Item>
                <Menu.Item key="life">
                  <ProfileOutlined />
                  生活记录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>

          {/* 正常适配 */}
          <Col xs={0} sm={0} md={9} lg={8} xl={6}>
            <Menu
              mode="horizontal"
              selectedKeys={selectedItem}
              onClick={toggleMenu}
            >
              <Menu.Item key="home">
                <Link href="/">
                  <a>
                    <HomeOutlined />
                    首页
                  </a>
                </Link>
              </Menu.Item>

              <Menu.Item key="collections">
                <Link href="/collections">
                  <a>
                    <ProfileOutlined />
                    专题
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="life">
                <Link href="/collections">
                  <a>
                    <ProfileOutlined />
                    生活记录
                  </a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </Affix>
  );
};

export default Header;
