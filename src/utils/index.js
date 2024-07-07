//统一中转工具模块函数， util下面可能会有各种工具函数模块，所有的汇集到这里。导出的时候直接从这里导就行了
import { request } from "./request";
import { getToken, setToken, removeToken } from "./token";
export { request, getToken, setToken, removeToken };
