import Header from "../components/header";
import detail from "../public/static/style/pages/detail.module.css";
import Author from "../components/author";
import Footer from "../components/footer";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Affix } from "antd";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import marked from "marked";
import hl from "highlight.js";
import Tocify from "../components/tocify.tsx";

const Detail = (props) => {
  useEffect(() => {
    console.log(props);
  });

  const [articleDetail, setArticleDetail] = useState(props);

  const tocify = new Tocify();
  const renderer = new marked.Renderer();
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

  let content = marked(articleDetail.content);

  return (
    <div className={detail.detail}>
      <Header />
      <Row justify="center" type="flex" className="container">
        <Col
          className={`left-container ${detail.container}`}
          xs={23}
          sm={23}
          md={16}
          lg={17}
          xl={15}
        >
          <Breadcrumb className={detail.breadcrumb}>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>我的文章</Breadcrumb.Item>
          </Breadcrumb>
          <div className={detail["detail-title"]}>{articleDetail.title}</div>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <span className={detail["detail-data-icon"]}>
              <CalendarOutlined /> {articleDetail.releaseTime}
            </span>
            <span className={detail["detail-data-icon"]}>
              <EyeOutlined /> {articleDetail.viewCount}
            </span>
          </div>
          <div
            className={detail["detail-content"]}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </Col>
        <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={4}>
          <Author />
          <Affix offsetTop={60}>
            <div className={detail["detail-outline"]}>
              <div className={detail["detail-outline-header"]}>文章大纲</div>
              <div className={detail["detail-outline-content"]}>{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await Axios(`http://localhost:7001/blog/detail/${id}`);
  return res.data.data[0];
};

export default Detail;
