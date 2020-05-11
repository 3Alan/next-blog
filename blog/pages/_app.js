import 'antd/dist/antd.css';
import '../public/static/style/pages/common.css';
import "highlight.js/styles/atom-one-dark.css";
import '../public/static/style/nprogress.css'
import Router from 'next/router';
import NProgress from 'nprogress';


Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
