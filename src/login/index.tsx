import styles from "./index.module.scss";
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginParams } from '@/services/api/login';

function Login() {
  const [form] = Form.useForm();
  const handleSubmit = async (values: LoginParams) => {
  };

  return (
    <div>
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
    </div>
  );
}

export default Login;
