import Layout from "@/pages/Layout"; //加入别名路径后@相当于之前的路径
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Publish from "@/pages/Publish";
import Article from "@/pages/Article";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    //中间包着children的形式
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
]);

export default router;
