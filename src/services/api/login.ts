import { JResponse } from "types";
import { ajax } from "..";

export type CurrentUser = {
}

export type LoginParams = {
  userName: string;
  password: string;
  grantType: string;
  nvcVal: string;
};

type Login = JResponse<{
  'jbt-token': string,
  user: CurrentUser
}>

// 获取用户信息
export const fetchUser: () => Promise<Login> = () => {
  return ajax.get(`/user/userinfo`);
}

// 登录
export const fetchLogin: (props: LoginParams) => Promise<Login> = (props) => {
  return ajax.post(`/login`, props);
}
