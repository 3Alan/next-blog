import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "antd";

// const DynamicComponent = dynamic(import("../../components/myNav"));

export default () => {
  const [time, setTime] = useState(Date.now());
  const [loadingComponet, setLoadingComponet] = useState(false);

  function dynamic() {
    setLoadingComponet(!loadingComponet);
  }

  async function changeTime() {
    // 懒加载moment
    const moment = await import("moment");
    setTime(moment.default(time).format());
  }

  return (
    <div>
      {/* {loadingComponet ? <DynamicComponent title="dynamic import" /> : ""} */}

      <Button>ok</Button>
      <div>articleContent</div>
      <h4>time:{time}</h4>
      <button onClick={changeTime}>
        lazyLoading plugin
      </button>
      <button onClick={dynamic}>dynamic import components</button>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};
