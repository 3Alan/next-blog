import React, { useState, useEffect } from 'react';
import marked from 'marked';
import hl from 'highlight.js';
import '../static/style/updateArticle.css';
import 'highlight.js/styles/atom-one-dark.css';
import { Row, Select, Col, Input, Button, Spin, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Api from '../utils/api';
import Axios from '../utils/axios';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import errors from '../utils/error';

const { Option } = Select;
const { TextArea } = Input;

function UpdateArticle(props) {
  const [typeList, setTypeList] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState('block');
  const [simplemde, setSimplemde] = useState(null);

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  useEffect(() => {
    initialData();
  }, []);
  useEffect(() => {
    if (props.match.params.id) {
      getArticleDetail(props.match.params.id);
    }
  }, [simplemde]);

  function initialData() {
    // 初始化markdown插件
    setSimplemde(
      new SimpleMDE({
        element: document.getElementById('editor'),
        autosave: true,
        previewRender(plainText) {
          return marked(plainText, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true, // 解析换行
            smartLists: true,
            smartypants: true,
            highlight(code) {
              return hl.highlightAuto(code).value;
            },
          });
        },
      })
    );

    setLoading(true);
    Axios({
      method: 'get',
      url: Api.getTypeList(),
    })
      .then((res) => {
        setTypeList(res.data.typeList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message.error('服务器开小差了');
      });
  }

  // 修改情况下获取文章详情
  function getArticleDetail(id) {
    setId(id);
    setShowSaveBtn('none');
    setLoading(true);
    Axios({
      method: 'get',
      url: Api.getArticleDetail(id),
    })
      .then((res) => {
        const { title, introduction, typeId, content, img } = res.data.articleDetail;
        setTitle(title);
        setIntroduction(introduction);
        setType(typeId);
        setImageUrl(img);
        if (simplemde) {
          simplemde.value(content);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
        message.error('服务器开小差了');
      });
  }

  function checkValidate() {
    if (!title) {
      throw new errors.ValidateError('请填写标题');
    } else if (!type) {
      throw new errors.ValidateError('请选择文章专题');
    } else if (!introduction) {
      throw new errors.ValidateError('请填写文章简介');
    } else if (!simplemde.value()) {
      throw new errors.ValidateError('请填写文章正文');
    }
  }

  async function save() {
    const data = {
      title,
      img: imageUrl,
      type_id: type,
      introduction,
      article_content: simplemde.value(),
    };
    // 有id时传递，没有时不传递
    if (id) {
      data.id = id;
    }
    try {
      checkValidate();
      const res = await Axios({
        method: 'POST',
        url: Api.saveArticle(),
        data,
      });
      if (res.data.result === 'success') {
        message.success('保存成功');
      } else {
        throw new errors.ValidateError('保存失败，请重试');
      }

      if (!id) {
        setId(res.data.id);
      }
    } catch (error) {
      message.warning(
        error.name === 'ValidateError' ? error.message : '服务器开小差了'
      );
    }
  }

  async function release() {
    const data = {
      title,
      img: imageUrl,
      type_id: type,
      introduction,
      article_content: simplemde.value(),
    };
    // 有id时传递，没有时不传递
    if (id) {
      data.id = id;
    }
    try {
      checkValidate();
      const res = await Axios({
        method: 'POST',
        url: Api.releaseArticle(),
        data,
      });
      if (res.data.result === 'success') {
        props.history.push(`/backstage/result/${title}发布成功/articleList`);
      } else {
        throw new errors.ValidateError('发布失败，请重试');
      }

      if (!id) {
        setId(res.data.id);
      }
    } catch (error) {
      message.warning(
        error.name === 'ValidateError' ? error.message : '服务器开小差了'
      );
    }
  }

  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Input
              addonBefore="博客标题"
              placeholder="博客标题"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Col>
          <Col span={24}>
            <Input
              addonBefore="图片链接"
              placeholder="图片链接"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row style={{ margin: '10px 0' }} gutter={8}>
          <Col span={18} className="introduction-container">
            <Upload
              className="avatar-uploader"
              listType="picture-card"
              showUploadList={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
            <TextArea
              rows={4}
              className="article-introduction"
              placeholder="文章简介"
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
              }}
            />
          </Col>
          <Col span={6}>
            <Select
              showSearch
              style={{ width: '100%' }}
              onSelect={(value) => {
                setType(value);
              }}
              placeholder="选择专题"
              value={type}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {typeList.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.type_name}
                  </Option>
                );
              })}
            </Select>
            <div className="button-container">
              {' '}
              <Button
                className="save-btn"
                onClick={save}
                style={{ display: showSaveBtn }}
              >
                保存文章
              </Button>
              <Button type="primary" onClick={release}>
                发布文章
              </Button>
            </div>
          </Col>
        </Row>

        <textarea id="editor" />
      </Spin>
    </div>
  );
}

export default UpdateArticle;
