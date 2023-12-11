import { Menu, MenuProps, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from "./layout.module.scss";
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import _ from "lodash";

/*
 * @Description 页面布局
 * @Author shenyangguang
 * @Date 2023/12/08
 */

type MenuItem = Required<MenuProps>['items'][number];
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

/** 获取左侧服务子项 */
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

/** 左侧服务列表 */
const menus: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <SettingOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
  ]),
];

const defaultPanes = [{ label: `Tab 1`, children: `Content of Tab Pane 1`, key: '1' }];

const PageLayout: React.FC = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);

  // 切换标签
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  // 删除标签
  const removeMenu = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  // 点击菜单
  const handleMenu: MenuProps['onClick'] = (e) => {
    const result = _.find(items, { 'key': e.key });
    if (result) {
      // 切换到已有标签
      onChange(e.key);
    } else {
      // 增加新标签
      const name = _.get(e, 'domEvent.target.innerText') || '';
      setItems([...items, { label: name, children: name, key: e.key }]);
      setActiveKey(e.key);
    }
  };

  return (
    <div className={styles.frame}>
      <div className={styles.top + ' dark-bg'}>
        <div>123</div>
        <div></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.menu + ' dark-bg'}>
          <Menu
            onClick={handleMenu}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            items={menus}
          />
        </div>
        <div className={styles.main}>
          <Tabs
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={removeMenu}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
