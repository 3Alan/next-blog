import Header from '../components/header';
import Head from 'next/head';
import detail from '../public/static/style/pages/detail.module.css';
import Author from '../components/author';
import Footer from '../components/footer';
import Axios from 'axios';
import Api from '../utils/api';
import { useState } from 'react';
import { withRouter } from 'next/router';
import { Row, Col, Breadcrumb, Affix, BackTop } from 'antd';
import {
  EyeOutlined,
  CalendarOutlined,
  UpOutlined,
  BookTwoTone,
  FieldTimeOutlined,
  FolderOpenFilled,
  LeftOutlined,
} from '@ant-design/icons';
import marked from 'marked';
import hl from 'highlight.js';
import Tocify from '../components/tocify.tsx';
import Link from 'next/link';

const Detail = (props) => {
  const [articleDetail] = useState(props.articleDetail);

  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  //用来设置anchor
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false, // false识别HTML
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hl.highlightAuto(code).value;
    },
  });

  function backPage() {
    props.router.back(-1);
  }

  return (
    <div className={detail.detail}>
      <Head>
        <title>{articleDetail.title}</title>
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
          <Breadcrumb className={detail.breadcrumb}>
            <Breadcrumb.Item onClick={backPage}>
              <a><LeftOutlined />返回</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleDetail.title}</Breadcrumb.Item>
          </Breadcrumb>
          <div className={detail['detail-title']}>{articleDetail.title}</div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span className={detail['detail-data-icon-time']}>
              <CalendarOutlined /> {articleDetail.releaseTime}
            </span>
            <span className={detail['detail-data-icon-time']}>
              <FieldTimeOutlined /> {articleDetail.updateTime}
            </span>
            <Link href={`/collection?id=${articleDetail.typeId}`}>
              <a>
                <span className={detail['detail-data-icon-special']}>
                  <FolderOpenFilled /> {articleDetail.typeName}
                </span>
              </a>
            </Link>

            <span className={detail['detail-data-icon-view']}>
              <EyeOutlined /> {articleDetail.viewCount}
            </span>
          </div>
          <div
            className={detail['detail-content']}
            dangerouslySetInnerHTML={{ __html: marked(articleDetail.content) }}
          ></div>
        </Col>
        <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={4}>
          <Author />
          <Affix offsetTop={60}>
            <div className={detail['detail-outline']}>
              <div className={detail['detail-outline-header']}>
                <BookTwoTone style={{ marginRight: 10 }} />
                文章大纲
              </div>
              <div className={detail['detail-outline-content']}>
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <BackTop>
        <div className="backtop">
          <UpOutlined />
        </div>
      </BackTop>
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await Axios(Api.getArticleDetail(id));
  return res.data;
};

export default withRouter(Detail);
