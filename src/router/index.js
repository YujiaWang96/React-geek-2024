import Layout from "@/pages/Layout"; //加入别名路径后@相当于之前的路径
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
  },
]);

export default router;
