import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN"; //引入汉化包，使得时间选择器显示中文

import { Table, Tag, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { delArticleAPI, getArticleListAPI } from "@/apis/article";
import { useEffect, useState } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const channelList = useChannel();
  // 准备列数据

  //定义一个枚举,和下面的status显示审核中还是审核完成连用。替代三元法
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        //render 是 Ant Design 的表格组件 Table 中的一个属性，用于自定义单元格的显示内容。render 属性接受一个函数，这个函数的参数是该单元格的数据，并返回一个 JSX 元素作为单元格的内容。
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => status[data], //data是后端返回的状态status。 1为待审核，2为审核
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />

            <Popconfirm
              title="Delete the article?"
              description="Are you sure to delete this article?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  //准备表格body数据;
  // const data = [
  //   {
  //     id: "8218",
  //     comment_count: 0,
  //     cover: {
  //       images: [],
  //     },
  //     like_count: 0,
  //     pubdate: "2019-03-11 09:00:00",
  //     read_count: 2,
  //     status: 2,
  //     title: "wkwebview离线化加载h5资源解决方案",
  //   },
  // ];
  //筛选功能
  const [reqDate, setReqDate] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 10,
  });
  //从服务器获取文章列表
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqDate);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [reqDate]);

  function onFinish(formValue) {
    console.log(formValue);
    setReqDate({
      ...reqDate,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formValue.date[1].format("YYYY-MM-DD"),
    });
  }

  //分页
  const onPageChange = (pages) => {
    setReqDate({
      ...reqDate,
      page: pages,
    });
  };

  //删除文章按钮
  const onConfirm = async (data) => {
    //一旦按了confirm按钮，要调用删除接口删除服务器的对应id的文章，然后再次渲染最新的列表
    await delArticleAPI(data.id);
    setReqDate({
      ...reqDate,
    });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="pls choose a channel"
              style={{ width: 120 }}
            >
              {channelList.map((item) => (
                <Option value={item.name} key={item.id}>
                  {item.name}
                </Option>
              ))}
              {/* <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option> */}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到${count}条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqDate.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
