import author from '../public/static/style/components/author.module.css';
import { Avatar, Divider, Tag, Tooltip } from 'antd';
import {
  GithubFilled,
  QqOutlined,
  DribbbleSquareOutlined,
  WechatOutlined,
} from '@ant-design/icons';

const Author = () => {
  const num = 981;
  return (
    <div className={author.container}>
      <Avatar
        size={100}
        src="https://gitee.com/alannum3/MyImages/raw/master/img/20200508165134.png"
        className="hvr-float-shadow"
      />
      <div className={author.name}>Alan</div>
      <div className={author.introduction}>
        <DribbbleSquareOutlined
          style={{ color: '#fbb933', fontSize: '1.5rem' }}
          className="hvr-wobble-vertical"
        />
        <Tag color="blue">NBA</Tag>
        <Tag color="purple">coder</Tag>
        <Tag color="gold">吃鸡</Tag>
        <Tag color="red">跑步</Tag>
        <Tag color="red">已发布文章{num}篇</Tag>
      </div>
      <Divider>Account</Divider>
      <div>
        <a href="https://github.com/3Alan" target="_blank">
          <Tooltip title="欢迎查看">
            <Avatar
              size={28}
              icon={<GithubFilled style={{ fontSize: 28, color: '#000' }} />}
              className={author.account}
              style={{ background: '#fff' }}
            />
          </Tooltip>
        </a>

        <a href="tencent://message/?uin=1540703192" target="_blank">
          <Tooltip title="点击添加">
            <Avatar
              size={28}
              icon={<QqOutlined style={{ fontSize: 22, color: '#fff' }} />}
              className={author.account}
              style={{ background: '#40a9ff' }}
            />
          </Tooltip>
        </a>

        <Tooltip
          title={
            <img
              src="https://gitee.com/alannum3/MyImages/raw/master/img/20200508213145.png"
              style={{ width: 80 }}
            />
          }
        >
          <Avatar
            size={28}
            icon={<WechatOutlined style={{ fontSize: 22, color: '#fff' }} />}
            className={author.account}
            style={{ background: '#87dc4b', cursor: 'pointer' }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Author;
