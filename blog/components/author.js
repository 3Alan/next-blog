import author from "../public/static/style/components/author.module.css";
import { Avatar, Divider } from "antd";
import { GithubOutlined, QqOutlined } from "@ant-design/icons";

const Author = () => {
  return (
    <div className={author.container}>
      <Avatar
        size={100}
        src="https://avatars3.githubusercontent.com/u/49978973?s=460&u=ff52a0c7a943dff2d87956ccc3321e2c95ab2d61&v=4"
      />
      <div className={author.name}>Alan</div>
      <span className={author.description}>
        精通是的卡就发了大水解放拉萨尽量克服
      </span>
      <Divider>Account</Divider>
      <div>
        <Avatar size={28} icon={<GithubOutlined />} className={author.account} />
        <Avatar size={28} icon={<QqOutlined />} className={author.account} />
      </div>
    </div>
  );
};

export default Author;
