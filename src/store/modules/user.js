//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "@/utils";
import { getToken, setToken as _setToken } from "@/utils"; //导入有关token的方法
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "", //先判断local storage是不是空，不是空就redux store初始化放local storage的东西
    userInfo: {},
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload); //使得token令牌不止存在store中也存在本地，刷新的时候，获取到的token就不会initialize成" "
    },
    clearUserInfo(state) {
      state.userInfo = {};
      state.token = "";
      removeToken();
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;
const userReducer = userStore.reducer;

//异步修改方法,获取token
const fetchLogin = (loginForm) => {
  //loginform是表单里的数据

  return async (dispatch) => {
    const res = await loginAPI(loginForm); //根据表单输入的信息，发送异步请求获取数据
    dispatch(setToken(res.data.token)); //提交同步方法进行数据的存入
  };
};
//获取userInfo的异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};

export { setToken, fetchLogin, setUserInfo, fetchUserInfo, clearUserInfo };
export default userReducer;
