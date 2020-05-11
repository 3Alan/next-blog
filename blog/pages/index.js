import Head from 'next/head';
import { useState } from 'react';
import Axios from 'axios';
import Api from '../utils/api';
import Header from '../components/header';
import Author from '../components/author';
import Footer from '../components/footer';
import ArticleList from '../components/articleList';
import { Row, Col, Tabs, BackTop } from 'antd';
import { FireOutlined, HistoryOutlined, UpOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Home = (props) => {
  const [articleList] = useState(props.data.filter(({isPin}) => !isPin));
  const [pinedArticleList] = useState(props.data.filter(({isPin}) => isPin));

  function toggleTabs(e) {
  }

  return (
    <div>
      <Head>
        <title>首页|Alan-前端博客</title>
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
            <div className="article-container" style={{marginBottom: 30}}>
              <ArticleList
                articleList={pinedArticleList}
                showHeader={true}
                showPin={true}
                showTag= {true}
              />
            </div>

            <Tabs
              defaultActiveKey="newest"
              onChange={toggleTabs}
              className="article-container"
            >
              <TabPane
                key="newset"
                tab={
                  <span>
                    <HistoryOutlined />
                    最新文章
                  </span>
                }
              >
                <ArticleList articleList={articleList} showTag={true} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <FireOutlined style={{ color: '#f5222d' }} />
                    热门文章
                  </span>
                }
                key="hotest"
              >
                该功能待开发
              </TabPane>
            </Tabs>
          </Col>
          <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={5}>
            <Author />
          </Col>
        </Row>
      </div>
      <BackTop>
        <div className="backtop">
          <UpOutlined />
        </div>
      </BackTop>
      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await Axios(Api.getArticleList());
  return res.data;
};

export default Home;
