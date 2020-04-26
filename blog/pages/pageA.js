import Link from "next/link";
import { withRouter, Router } from "next/router";
import Axios from "axios";
import { useEffect } from "react";


const PageA = (props) => {
  useEffect(() => {
    console.log(props);
  });

  // withRouter(组件)，相当于把Router属性添加到了props中
  Router.events.on("routeChangeStart", (arg) => {
    console.log(`1.routeChangeStart:${arg}`);
  });
  Router.events.on("routeChangeComplete", (arg) => {
    console.log(`2.routeChangeComplete:${arg}`);
  });

  return (
    <div>
      <h3>pageA</h3>
      title:
      <b>{props.router.query.title}</b>
      <br />
      <Link href="/">
        <a>go back Home</a>
      </Link>
      <div>getInitialProps---------->{props.datas[0]}</div>
    </div>
  );
};

// res.data注入到了组件的props属性中了
PageA.getInitialProps = async () => {
  const res = await Axios("http://localhost:8888/test/getTodoList");
  return res.data;
};

export default withRouter(PageA);
