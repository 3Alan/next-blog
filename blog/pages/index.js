import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import Axios from 'axios';
import Header from "../components/header";
import Author from "../components/author";
import Footer from "../components/footer";
import { Row, Col, List } from "antd";
import { MessageOutlined, EyeOutlined, CalendarOutlined } from "@ant-design/icons";

const Home = (props) => {
  useEffect(() => {
    console.log(props);
  })
  const [color, setColor] = useState("red");
  const [articleList, setArticleList] = useState(props.data);
  const hasImg = true;

  const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );

  function goToPageA() {
    Router.push({
      pathname: "/pageA",
      query: {
        title: "click push title",
      },
    });
  }

  function changeColor() {
    setColor(color === "red" ? "blue" : "red");
  }

  return (
    <div>
      <Head>
        <title>首页|Alan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Row justify="center" type="flex" className="container">
        <Col className="left-container" xs={23} sm={23} md={16} lg={17} xl={14}>
          <List
            header={<div>最新</div>}
            itemLayout="vertical"
            dataSource={articleList}
            renderItem={(item) => (
              <List.Item
                className="list-item"
                key={item.title}
                actions={[
                  <IconText
                    icon={CalendarOutlined}
                    text={item.releaseTime}
                    key="list-vertical-time-o"
                  />,
                  <IconText
                    icon={EyeOutlined}
                    text={item.viewCount}
                    key="list-vertical-view-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="23"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  hasImg ?
                  (<img
                    className="list-image"
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />) : ''
                }
              >
                <List.Item.Meta
                  title={<Link href={{ pathname: "/detail", query: {id: item.id}}}><a>{item.title}</a></Link>}
                  description={item.intruction}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="right-container" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
        </Col>
      </Row>
      <Footer />

      {/* <h1 className="title">
        <MyNav title="welcome Alan" />
      </h1>
      <div className="grid">
        <Link href="/pageA?title=link title">
          <a className="card">
            <h3>Link to PageA &rarr;</h3>
          </a>
        </Link>
        <a className="card" onClick={goToPageA}>
          <h3>Router.push() PageA &rarr;</h3>
        </a>
        <Link href={{ pathname: "/article/content" }}>
          <a className="card">
            <h3>Link to articleContent &rarr;</h3>
          </a>
        </Link>
        <button onClick={changeColor}>change the title color</button>
      </div> */}
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await Axios("http://localhost:7001/blog/getArticleList");
  return res.data;
};

export default Home;
