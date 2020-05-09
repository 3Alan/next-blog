import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Modal, notification } from 'antd';
import Api from '../utils/api';
import Axios from '../utils/axios';
import '../static/style/articleList.css';
import { ExclamationCircleOutlined, PushpinOutlined } from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;

function ArticleList(props) {
  useEffect(() => {
    getArticleList();
  }, []);

  const [articleList, setArticleList] = useState([]);

  function getArticleList() {
    Axios({
      method: 'GET',
      url: Api.getArticleList(),
    })
      .then((res) => {
        setArticleList(res.data.articleList);
      })
      .catch((error) => {
        message.warning(error.name);
      });
  }

  async function updateStatus(id, status, title) {
    if (status) {
      confirm({
        title:
          status === -1 ? '确认要下线该文章吗？' : '确认要上线/发布该文章吗？',
        icon: <ExclamationCircleOutlined />,
        content:
          status === -1
            ? '下线之后文章将不再展示在博客中'
            : '上线/发布后将再博客中展示',
        okText: '确认',
        okType: 'danger',
        cancelText: '我再看看',
        onOk() {
          return Axios({
            method: 'PATCH',
            url: Api.updateArticleStatus(),
            data: {
              id,
              status,
            },
          }).then(res => {
            let description;
            if(res.data.result === 'success') {
              description = status === -1 ? '文章下线成功' : '文章上线成功';
              notification.success({ message: title, description, });
            } else {
              description = status === -1 ? '文章下线失败' : '文章上线失败';
              notification.error({ message: title, description, });
            }
            getArticleList();
          }).catch(error => {
            message.error(error);
          });

          
        },
      });
    } else {
      props.history.push(`/backstage/updateArticle/${id}`);
    }
  }

  return (
    <Table
      dataSource={articleList}
      pagination={{ pageSize: 6, position: ['bottomCenter'] }}
    >
      <Column title="标题" dataIndex="title" key="title" width={280} render={(title, columnItem) => (
        columnItem.isPin ? <span><Tag color="red"><PushpinOutlined />顶置</Tag>{title}</span> : <span>{title}</span>
      )}/>
      <Column
        title="专题"
        dataIndex="typeName"
        key="typeName"
        width={150}
        render={(typeName) => (
          <span>
            <Tag color="blue" key={typeName}>
              {typeName}
            </Tag>
          </span>
        )}
      />
      <Column
        title="文章状态"
        dataIndex="status"
        key="stauts"
        width={100}
        render={(status) =>
          status ? (
            status === 1 ? (
              <span style={{ color: '#52c41a' }}>已发布</span>
            ) : (
              <span style={{ color: '#ff603b' }}>已下线</span>
            )
          ) : (
            <span style={{ color: '#faad14' }}>未发布</span>
          )
        }
      />
      <Column
        title="发布时间"
        dataIndex="releaseTime"
        key="releaseTime"
        width={150}
      />
      <Column
        title="更新时间"
        dataIndex="updateTime"
        key="updateTime"
        width={150}
      />
      <Column
        title="操作"
        key="action"
        dataIndex="status"
        render={(status, columnItem) =>
          status ? (
            status === 1 ? (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 20 }}
                  onClick={updateStatus.bind(
                    this,
                    columnItem.id,
                    0,
                    columnItem.title
                  )}
                >
                  修改
                </Button>
                <Button
                  danger
                  onClick={updateStatus.bind(
                    this,
                    columnItem.id,
                    -1,
                    columnItem.title
                  )}
                >
                  下线
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 20 }}
                  onClick={updateStatus.bind(
                    this,
                    columnItem.id,
                    0,
                    columnItem.title
                  )}
                >
                  修改
                </Button>
                <Button
                  type="primary"
                  className="orange-btn"
                  onClick={updateStatus.bind(
                    this,
                    columnItem.id,
                    1,
                    columnItem.title
                  )}
                >
                  上线
                </Button>
              </>
            )
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginRight: 20 }}
                onClick={updateStatus.bind(
                  this,
                  columnItem.id,
                  0,
                  columnItem.title
                )}
              >
                修改
              </Button>
            </>
          )
        }
      />
    </Table>
  );
}

export default ArticleList;
