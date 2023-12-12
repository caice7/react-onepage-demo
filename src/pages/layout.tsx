import { Menu, MenuProps, Tabs, TabsProps } from 'antd';
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
type Tab = Required<TabsProps>['items'][number];

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

function getQueryString(name: string) {
  return new URL(window.location.href).searchParams.get(name);
}

const router: Record<string, { dom: React.JSX.Element, name: string }> = {
  info: { name: '修改资料', dom: <div>资料dom</div> },
  menu: { name: '菜单管理', dom: <div>菜单dom</div> },
}

const defaultPanes: Tab[] = [{ label: `主界面`, children: `Content of Tab Pane 1`, key: '1', closable: false }];

/** 左侧服务列表 */
const menus: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <SettingOutlined />, [
    getItem(defaultPanes[0].label, defaultPanes[0].key),
  ]),

  getItem('系统管理', 'system', <AppstoreOutlined />, ['info', 'menu'].map(l => getItem(router[l].name, l))),
];

/** 默认选中菜单值 */
const initActiveKey = () => {
  const menus = getQueryString('menus');
  if (menus) {
    const list = menus.split(',');
    return list[list.length - 1];
  } else {
    return defaultPanes[0].key;
  }
}

/** 默认标签页 */
const initItems = () => {
  const menus = getQueryString('menus');
  if (menus) {
    const list = menus.split(',');
    list.forEach(l => {
      defaultPanes.push({ label: router[l].name, children: router[l].dom, key: l });
    })
  }
  return defaultPanes;
}

const PageLayout: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initActiveKey());
  const [items, setItems] = useState(initItems());

  // 切换标签
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  // 删除标签
  const removeMenu = (targetKey: TargetKey) => {
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      // 如果删除当前显示标签
      const { key } = newPanes[newPanes.length - 1];
      setActiveKey(key);
    }
    setItems(newPanes);
    let menus = (getQueryString('menus') || '').split(',');
    menus = _.filter(menus, (e) => e !== targetKey);
    window.history.replaceState({}, "", window.location.origin + window.location.pathname + '?menus=' + menus.join(','));
  };

  // 点击菜单
  const handleMenu: MenuProps['onClick'] = (e) => {
    const key = e.key;
    const result = _.find(items, { key });
    if (result) {
      // 切换到已有标签
      onChange(key);
    } else {
      // 增加新标签
      const name = _.get(e, 'domEvent.target.innerText') || '';
      setItems([...items, { label: name, children: router[key].dom, key }]);
      setActiveKey(key);
      const menus = getQueryString('menus') || '';
      window.history.replaceState({}, "", window.location.origin + window.location.pathname + '?menus=' + (menus ? `${menus},${key}` : key));
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
            selectedKeys={[activeKey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            items={menus}
          />
        </div>
        <div className={styles.main}>
          <Tabs
            hideAdd
            className='main-tabs'
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
