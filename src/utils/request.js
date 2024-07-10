//axios封装处理
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
//1.根域名配置
//2.超时时间
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0", //根域名配置，很多接口前面的根域名是一样的，提取出配置一次
  timeout: 5000, //等待时间超出就不等了
});

//3.添加请求拦截器  （请求拦截器：在请求发送服务器之前做拦截，可以插入一些自定义的配置和参数的处理），现在加入token判断。符合token的有些请求才可以发送
request.interceptors.request.use(
  //操作config对象来添加自己的参数，比如token发送出去
  //1.获取token
  (config) => {
    //config 是一个对象，包含了 Axios 请求的配置信息。这个对象可以用来设置请求的各种属性，例如 URL、方法、头信息、请求体等
    const token = getToken();
    if (token) {
      //如果token存在，就打包进请求头发送给服务器了。如需严重token就能找到对应的token
      config.headers.Authorization = `Bearer ${token}`; //等号前是一个固定的格式，后面是后端提供的固定写法
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器    （响应拦截器：在请求返回客户端前做拦截，重点处理返回的数据）
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //监控401 token失效
    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login"); //教程写法,此处不是react组件，不能用react内部的navigate（‘/login’）
      window.location.reload(); //跳转小bug强制刷新重定向
    }
    return Promise.reject(error);
  }
);

export { request };
