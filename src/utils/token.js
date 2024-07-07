//封装3个token的方法，存取删
//后面其他不同的模块要用的时候导入用就行，不用每个都重新写一遍

const tokenKey = "token_key";
function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

function getToken() {
  return localStorage.getItem(tokenKey);
}
function removeToken() {
  localStorage.removeItem(tokenKey);
}

export { setToken, getToken, removeToken };
