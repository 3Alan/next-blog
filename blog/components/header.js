import React, { useState } from 'react';
import { Row, Col, Menu, Affix, Drawer } from 'antd';
import header from '../public/static/style/components/header.module.css';
import {
  HomeOutlined,
  ProfileOutlined,
  MenuOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const Header = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  function onClose() {
    setShowDrawer(false);
  }

  function showLeftMenu() {
    setShowDrawer(true);
  }

  return (
    <Affix offsetTop={0}>
      <div className={header.header}>
        <Row type="flex" justify="center" gutter={16}>
          <Col xs={23} sm={23} md={14} lg={15} xl={13}>
            <div className={header.title}>
              <Link href="/">
                <a className="hvr-buzz-out">
                  <span className={header['author-name']}>Alan</span>
                </a>
              </Link>
              <span className={header['author-description']}>
                此刻想举重若轻，之前必要负重前行。
              </span>
            </div>

            {/* 移动端适配 */}

            <MenuOutlined
              style={{ display: 'none' }}
              className={header['show-menu']}
              onClick={showLeftMenu}
            />
          </Col>

          <Drawer
            title="Alan"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={showDrawer}
          >
            <Menu mode="inline" style={{width: '100%'}}>
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
              <Menu.Item key="archive">
                <Link href="/archive">
                  <a>
                    <FolderOutlined />
                    归档
                  </a>
                </Link>
              </Menu.Item>
            </Menu>
          </Drawer>

          {/* 正常适配 */}
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

              <Menu.Item key="collections">
                <Link href="/collections">
                  <a>
                    <ProfileOutlined />
                    专题
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="archive">
                <Link href="/archive">
                  <a>
                    <FolderOutlined />
                    归档
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
