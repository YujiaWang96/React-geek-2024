//axios封装处理
import axios from "axios";
//1.根域名配置
//2.超时时间
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0", //根域名配置，很多接口前面的根域名是一样的，提取出配置一次
  timeout: 5000, //等待时间超出就不等了
});

//3.添加请求拦截器  （请求拦截器：在请求发送服务器之前做拦截，可以插入一些自定义的配置和参数的处理）
request.interceptors.request.use(
  (config) => {
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
    return Promise.reject(error);
  }
);

export { request };
