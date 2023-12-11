import { message } from "antd";

/*
 * @Description 工具类
 * @Author shenyangguang
 * @Date 2023/12/08
 */

/** 消息提示 */
export const msg = {
  warning: (c: string | undefined, t?: number) => message.warning(c, t || 3),
  error: (c: string | undefined) => message.error(c, 3),
  success: (c: string, t?: number) => message.success(c, t || 1),
  loading: (c: string) => message.loading(c),
}
