//逻辑：有token正常跳转相关页面，没有token去登录先

import { getToken } from "@/utils";
import Login from "@/pages/Login";
//import { Navigate } from "react-router-dom";

//高阶组件（Higher-Order Component, HOC）是 React 中用于复用组件逻辑的一种高级技术。它本质上是一个函数，接受一个组件并返回一个新的组件。高阶组件通常用于添加额外的功能或修改现有组件的行为，而无需修改其原始实现。
function AuthRoute({ children }) {
  //参数是一个路由组件,将要跳转的组件
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Login />; // 教程写的 return <Navigate to= {'/login'} replace/> replace模式
  }
}

export default AuthRoute;
