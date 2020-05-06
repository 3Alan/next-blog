import React, { useState, useEffect } from 'react';
import '../static/style/updateSpecial.css';
import { Row, Tag, Col, Input, Button, Upload, message, Divider } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TwitterPicker } from 'react-color';
import Api from '../utils/api';
import Axios from '../utils/axios';
import errors from '../utils/error';

function UpdateSpecial(props) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  function showColor(e) {
    setColor(e.hex);
  }

  function checkValidate() {
    if (!title) {
      throw new errors.ValidateError('请填写专题名称');
    } else if (!imageUrl) {
      throw new errors.ValidateError('请添加专题图片');
    } else if (!color) {
      throw new errors.ValidateError('请选择标签颜色');
    }
  }

  async function addSpecial() {
    try {
      checkValidate();
      const res = await Axios({
        method: 'POST',
        url: Api.addSpecial(),
        data: {
          type_name: title,
          image: imageUrl,
          tag_color: color,
        }
      });
      if (res.data.result === 'success') {
        props.history.push('/backstage/result/添加专题成功/specialList');
      } else {
        throw new errors.ValidateError('添加失败，请重试');
      }
      
    } catch (error) {
      message.warning(
        error.name === 'ValidateError' ? error.message : '服务器开小差了'
      );
    }
  }

  return (
    <div>
      <Row gutter={[8, 32]}>
        <Col span={12}>
          <Input
            addonBefore="专题名称"
            placeholder="专题名称"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>
          <Input
            addonBefore="专题图片"
            placeholder="图片链接"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </Col>
        <Divider>效果预览</Divider>
        <Col span={12}>
          <div className="img-container">
            <div
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            ></div>
          </div>
          <div className="img-container-text">
            <span className="img-container-text-name">
              {title}
            </span>
            <span>32篇文章</span>
            <span className="img-container-text-time">
              最新更新时间：2020-04-30
            </span>
          </div>
        </Col>
        <Col span={12}>
          <Tag color={color} className="special-tag">
            {title || '标签预览'}
          </Tag>
          <TwitterPicker onChange={showColor} color={color} />
        </Col>
        <Divider />
        <div className="bottom-btn">
          <Button type="primary" onClick={addSpecial}>添加</Button>
        </div>
      </Row>
    </div>
  );
}

export default UpdateSpecial;
