//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

const { setToken } = userStore.actions;
const userReducer = userStore.reducer;

//异步修改方法
const fetchLogin = (loginForm) => {
  //loginform是表单里的数据

  return async (dispatch) => {
    const res = await request.post("authorizations", loginForm); //发送异步请求获取数据
    dispatch(setToken(res.data.token)); //提交同步方法进行数据的存入
  };
};

export { setToken, fetchLogin };
export default userReducer;
