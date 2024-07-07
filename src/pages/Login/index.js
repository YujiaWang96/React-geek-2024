import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    //一提交就触发异步操作
    await dispatch(fetchLogin(values)); //await来确保数据给store传完了，防止后面没传完就navigate到其他可能需要数据的页面

    //1.跳转页面（router路由）
    navigate("/");
    //2.提示用户登录成功
    message.success("login successfully");
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/* 一旦表单from里面的提交按钮点击后就会执行onfinish，把输入框的数据作为实参，放入onfinish函数的虚参中提交给后台。以对象的形式，内部是键值对，key是form.item里的name，所以name命名要和后端接口里名字要求一样 */}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          {" "}
          {/* 失焦的时候触发form下面item里的rules */}
          <Form.Item
            name="mobile"
            //会按顺序依次校验rules，不通过就会卡在当前并且打印msg
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "Please enter a correct format phone number",
              },
            ]}
          >
            <Input size="large" placeholder="Please enter phone number" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              size="large"
              placeholder="Please enter the verification code"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
