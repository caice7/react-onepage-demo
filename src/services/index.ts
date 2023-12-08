/*
 * @Description 请求封装
 * @Author shenyangguang
 * @Date 2023/12/06
 */

import { msg } from '@/tools';

// 接口 
// export const ipconfig = '/v1';
export const ipconfig = 'http://192.168.1.109:6070';
// export const ipconfig = 'http://192.168.1.111:6070';

/** 异常处理 */
export const dealCatch = (error: any) => {
  const code = error?.code;
  if (!code) {
    msg.error('请求失败');
  } else if (code === 901 || code === 912) {
    // jumpLogin();
  } else if ((code >= 700 && code < 800) || code === 900) {
    msg.error(error.msg);
  } else {
    console.log(error);
  }
  return false;
}

export const getHeaders = () => {
  return {
    'jbt-token': localStorage.getItem('admin-token') || '',
    'version': 'v0.0.1',
  }
}
export const ajax = {
  post: function (api: string, params: object, type?: string) {
    return fetch(ipconfig + api, {
      method: type || 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...getHeaders(),
      }
    }).then(async response => {
      if (response.status !== 200) {
        // 错误处理
        throw await response.json();
      }
      return response.json();
    }).catch(e => dealCatch(e));
  },
  get: function (api: string, type?: string) {
    return fetch(ipconfig + api, {
      method: type || 'get',
      headers: getHeaders(),
    }).then(async response => {
      if (response.status !== 200) {
        // 错误处理
        throw await response.json();
      }
      return response.json();
    }).catch(e => dealCatch(e));
  },
  getImg: function (api: string) {
    return fetch(ipconfig + api, {
      method: 'get',
      headers: getHeaders(),
    }).then(async response => {
      if (response.status !== 200) {
        // 错误处理
        throw await response.json();
      }
      return response.blob();
    }).catch(e => dealCatch(e));
  },
  patch: function (api: string, params: object) {
    return ajax.post(api, params, 'PATCH');
  },
  put: function (api: string, params: object) {
    return ajax.post(api, params, 'PUT');
  },
  delete: function (api: string) {
    return ajax.get(api, 'DELETE');
  },
  deletes: function (api: string, params: object) {
    return ajax.post(api, params, 'DELETE');
  },
  export: function (api: string, params: object) {
    return fetch(ipconfig + api, {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        responseType: 'blob',
        ...getHeaders(),
      }
    }).then(async response => {
      return response.blob();
    }).catch(e => dealCatch(e));
  },
}