import React from 'react';
import Link from 'next/link';
import { List, Tag, Typography, Breadcrumb } from 'antd';
import {
  EyeOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
} from '@ant-design/icons';

const { Paragraph } = Typography;
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const ArticleList = ({
  articleList,
  showTag = false,
  showHeader = false,
  headerTitle,
  showPin = false,
}) => {
  return (
    <List
      header={
        showHeader ? (
          showPin ? (
            <span style={{padding: 10, color: '#ff7875'}}>
              <PushpinOutlined />
              顶置文章
            </span>
          ) : (
            <div className="article-list-header">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/collections">专题</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{headerTitle}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          )
        ) : (
          ''
        )
      }
      itemLayout="vertical"
      dataSource={articleList}
      renderItem={(item) => (
        <List.Item
          className="list-item"
          key={item.title}
          actions={[
            <IconText
              icon={FieldTimeOutlined}
              text={item.updateTime}
              key="list-vertical-time-o"
            />,
            <IconText
              icon={EyeOutlined}
              text={item.viewCount}
              key="list-vertical-view-o"
            />,
            showTag ? (
              <Link href={`/collection?id=${item.typeId}`}>
                <Tag color={item.specialColor} style={{ cursor: 'pointer' }}>
                  {item.typeName}
                </Tag>
              </Link>
            ) : (
              ''
            ),
          ]}
          extra={
            !!item.img ? (
              <img
                className="list-image"
                width={272}
                alt="logo"
                src={item.img}
              />
            ) : (
              ''
            )
          }
        >
          <List.Item.Meta
            title={
              <Link
                href={{
                  pathname: '/detail',
                  query: { id: item.id },
                }}
              >
                <a>{showPin ? (<Tag icon={<PushpinOutlined />} color="red">顶置文章</Tag>) : ''}{item.title}</a>
              </Link>
            }
            description={
              <Paragraph ellipsis={{ rows: 4, expandable: true }}>
                {item.introduction}
              </Paragraph>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ArticleList;
