import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Link } from 'react-router-dom';
import {
  FolderOpenOutlined,
  PieChartOutlined,
  TagsOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import '../static/style/index.css';
import UpdateSpecial from './updateSpecial';
import UpdateArticle from './updateArticle';
import ResultTip from './resultTip';
import ArticleList from './articleList';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Index = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    const activeKey = props.location.pathname.split('/backstage/')[1];
    setActiveKey(activeKey);
  },[]);

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  function menuItemClick(e) {
    const { key } = e;
    setActiveKey(key);
    switch (key) {
      case 'updateArticle':
        props.history.push('/backstage/updateArticle');
        break;
      case 'articleList':
        props.history.push('/backstage/articleList');
        break;
      case 'updateSpecial':
        props.history.push('/backstage/updateSpecial');
        break;

      default:
        break;
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={activeKey}>
          <Menu.Item key="statistics" icon={<PieChartOutlined />}>
            访问统计
          </Menu.Item>
          <SubMenu
            key="article"
            icon={<ReadOutlined />}
            title="文章"
            onClick={menuItemClick}
          >
            <Menu.Item key="updateArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章管理</Menu.Item>
          </SubMenu>
          <SubMenu key="special" icon={<TagsOutlined />} title="专题" onClick={menuItemClick}>
            <Menu.Item key="updateSpecial">添加专题</Menu.Item>
            <Menu.Item key="specialManagement">专题管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="archive" icon={<FolderOpenOutlined />}>
            归档
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 22, minHeight: 360, marginTop:20 }}
          >
            <Route path="/backstage/updateArticle" component={UpdateArticle} exact/>
            <Route path="/backstage/updateArticle/:id" component={UpdateArticle} />
            <Route path="/backstage/result/:title/:location" component={ResultTip} exact/>
            <Route path="/backstage/updateSpecial" component={UpdateSpecial} exact />
            <Route
              path="/backstage/articleList"
              component={ArticleList}
              exact
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Alan's Blog Management</Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
