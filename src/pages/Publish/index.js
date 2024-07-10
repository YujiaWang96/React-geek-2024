import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

import { useChannel } from "@/hooks/useChannel";
import { createArticleAPI } from "@/apis/article";

const { Option } = Select;

const Publish = () => {
  //获取频道列表
  const channelList = useChannel();

  const onFinish = (formValue) => {
    console.log(formValue); //接下来把这个数据对象发给服务器后端

    //判断图片数量imageType和图片列表里包含的实际图片数量是否相等
    if (imageList.length !== imageType) {
      return message.warning("图片数量不匹配");
    }
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => item.response.data.url),
      },
      channel_id,
    };
    createArticleAPI(reqData);
  };
  //上传图片的方法
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    setImageList(value.fileList);
  };

  //切换图片上传数量
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    console.log("切换了", e.target.value);
    setImageType(e.target.value);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }} //initialValue是可以控制整个表单的初始值，此处的type关联着选择单图双图的value，默认是0，即无图
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType决定选择文件筐的外观样式，方形。 showUploadList 控制显示上传列表，当上传多张图片后都可以显示出来 */}
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                maxCount={imageType} //ant Design 上面uplaod组件的控制数量属性
                onChange={onChange} //在上传过程中会不断执行onChange
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
