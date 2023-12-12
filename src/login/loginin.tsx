import React from 'react';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { fetchLogin, LoginParams } from '@/services/api/login';
import { Form } from 'antd';
import styles from "./index.module.scss";
import { msg } from '@/tools';

/*
 * @Description 登录表格
 * @Author shenyangguang
 * @Date 2023/12/08
 */

const LoginIn: React.FC = () => {
  const [form] = Form.useForm();
  const handleSubmit = (values: LoginParams) => {
    try {
      // 登录
      window.nvc.getNVCValAsync(async (nvcVal: string) => {
        const res = await fetchLogin({
          ...values,
          grantType: 'PASSWORD',
          nvcVal,
        });
        if (res.code === 200) {
          localStorage.setItem("admin-token", res.data['jbt-token']);
          msg.success('登录成功！');
          window.location.reload();
        } else {
          // 如果失败去设置用户错误信息
          msg.error(res.msg);
        }
      });
    } catch (error) {
      console.log(error);
      msg.error('登录失败，请重试！');
    }
  };

  return (
    <LoginForm
      form={form}
      contentStyle={{
        minWidth: 280,
        maxWidth: '75vw',
      }}
      initialValues={{
        autoLogin: true,
      }}
      onFinish={async (values) => {
        await handleSubmit(values);
      }}
    >
      <div className={styles.subtitle}>管理系统</div>
      <ProFormText
        name="userName"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder='用户名'
        rules={[{ required: true, message: "请输入用户名!", }]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder='密码'
        rules={[{ required: true, message: "请输入密码！", }]}
      />
    </LoginForm>
  );
};

export default LoginIn;