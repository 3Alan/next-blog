import Header from '../components/header';
import Head from 'next/head';
import Author from '../components/author';
import Footer from '../components/footer';
import ArticleList from '../components/articleList';
import Axios from 'axios';
import Api from '../utils/api';
import { useState } from 'react';
import { Row, Col } from 'antd';

const Collection = (props) => {
  const [collectionList] = useState(props.data);
  const [title] = useState(collectionList.length ? collectionList[0].typeName : '');

  return (
    <div>
      <Head>
        <title>{title}专题文章</title>
      </Head>
      <Header />
      <div className="container">
        <Row justify="center" type="flex">
          <Col
            className="left-container content-container"
            xs={23}
            sm={23}
            md={16}
            lg={17}
            xl={14}
          >
            <ArticleList articleList={collectionList} showHeader={true} headerTitle={title} />
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
