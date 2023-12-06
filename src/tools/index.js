import { message } from "antd";

/** 消息提示 */
export const msg = {
  warning: (c, t) => message.warning(c, t || 3),
  error: (c) => message.error(c, 3),
  success: (c, t) => message.success(c, t || 1),
  loading: (c) => message.loading(c),
}
