import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

/*
 * @Description 页面下方版权
 * @Author shenyangguang
 * @Date 2023/12/08
 */

const Footer: React.FC = () => {
  const defaultMessage = 'Copyright 旧邦通 版权所有';

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={defaultMessage}
    />
  );
};

export default Footer;
