import { message } from "antd";

//初始化nvc
export function nvcInit() {
  // 实例化nvc 对无痕验证进行初始化操作
  window.AWSC.use('nvc', function (state: any, module: any) {
    // 初始化 调用module.init进行初始化
    window.nvc = module.init({
      // 应用类型标识。它和使用场景标识（scene字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
      appkey: 'FFFF0N00000000009DBA',
      //使用场景标识。它和应用类型标识（appkey字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
      scene: 'nvc_login',
      // 二次验证获取人机信息串，跟随业务请求一起上传至业务服务器，由业务服务器进行验签。
      //test: module.TEST_PASS, // 测试无痕验证通过

      success: function () {
      },
      // 前端二次验证失败时触发该回调参数
      fail: function (failCode: any) {
        console.error(failCode)
      },
      // 前端二次验证加载异常时触发该回调参数。
      error: function (errorCode: any) {
        console.error(errorCode)
      },
    })
  })
}

/** 引入阿里验证 */
export const importNvc = () => {
  if (!window.AWSC) {
    const head = document.getElementsByTagName('head')[0] || document.documentElement;
    const src = 'https://g.alicdn.com/AWSC/AWSC/awsc.js';
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.onload = function () {
      nvcInit();
    }
    script.setAttribute('src', src);
    head.appendChild(script);
  }
}

// 发送业务请求：点击按钮时触发，主动获取人机信息串，并发送给业务服务端
export function handleError(resJson: any) {
  // 业务服务器请求回调控制是否需要二次验证
  if (resJson.code === 800 || resJson.code === 900) {
    // 无痕验证失败，直接拦截
    message.error('验证失败，请刷新页面重试');
  } else if (resJson.code === 400) {
    // 无痕验证失败，触发二次验证
    // 二次验证码（滑动验证码）配置项设置，详情请见滑动验证集成方式文档
    // 二次验证的appkey，scene，test值及success，fail，error的回调由nvc初始化时决定，请不要在二次验证时传入
    // 唤醒二次验证（滑动验证码）
    message.error('请按住滑块，拖动到最右边，进行安全验证');
    const ncBox = document.getElementById("ncBox");
    if (ncBox && ncBox.style.display !== 'block') {
      window.nvc.getNC({
        // 声明滑动验证需要渲染的目标ID。
        renderTo: 'nc',
      });
      ncBox.style.display = 'block';
    }
  } else {
    message.error(resJson.msg);
  }
}
