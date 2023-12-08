import { JResponse } from "types";
import { ajax } from "..";

export type CurrentUser = {
}

export type LoginParams = {
  userName: string;
  password: string;
};

type Login = JResponse<{
  'jbt-token': string,
  user: CurrentUser
}>

// 获取用户信息
export const fetchUser: () => Promise<Login> = () => {
  return ajax.get(`/user/userinfo`);
}
