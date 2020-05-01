import React, { useState, useEffect } from 'react';
import marked from 'marked';
import hl from 'highlight.js';
import '../static/style/addArticle.css';
import "highlight.js/styles/monokai-sublime.css"
import { Row, Select, Col, Input, Button, BackTop } from 'antd';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

const { Option } = Select;

function AddArticle() {

  const [articleContent, setArticleContent] = useState('')
  const [rendContent, setRendContent] = useState('预览效果');

  // function syncRender(e) {
  //   setArticleContent(e.target.value);
  //   let html = marked(e.target.value);
  //   setRendContent(html)
  // }

  useEffect(() => {
    new SimpleMDE({
      element: document.getElementById('editor'),
      autofocus: true,
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
    });
  })

  return (
    <div>
      <Row gutter={6}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={12}>
              <Input placeholder="博客标题" />
            </Col>
            <Col span={3}>
              <Select
                showSearch
                style={{ width: 100 }}
                placeholder="专题"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>
            <Col span={3}>
              图片上传
            </Col>
            <Col span={5}>
              <Button className="save-btn">保存</Button>
              <Button type="primary" size="middle">发布</Button>
            </Col>
          </Row>
          <Row gutter={6} className="edit-container">
            <Col span={24}>
              <textarea rows={25}
                id="editor"
                // onChange={syncRender}
                // value={articleContent}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <BackTop style={{height: 80, width: 40, background: '#CCC'}}>up</BackTop>
    </div>
  );
}

export default AddArticle;
