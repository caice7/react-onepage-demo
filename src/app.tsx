import { useEffect, useState } from 'react';
import Login from './login';
import { fetchUser } from './services/api/login';
import { importNvc } from './login/verify';
import PageLayout from './pages/layout';
import styles from "./app.module.scss";

/*
 * @Description 主入口
 * @Author shenyangguang
 * @Date 2023/12/08
 */

const Loading = () => {
  return (
    <div>
      <div className={styles.loading}>
        <div className={styles.warp}>
          <div className={styles.spin}>
            <span className={styles.dot}>
              <i className={styles.item}></i>
              <i className={styles.item}></i>
              <i className={styles.item}></i>
              <i className={styles.item}></i>
            </span>
          </div>
        </div>
        <div className={styles.title}>
          正在加载资源
        </div>
        <div className={styles.subtitle}>
          初次加载资源可能需要较多时间 请耐心等待
        </div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  importNvc();
  useEffect(() => {
    fetchUser().then(res => {
      setLoading(false);
      if (res) {
        setIsLogin(true);
      }
    })
  }, []);
  return loading ? <Loading /> : isLogin ? <PageLayout /> : <Login />;
}

export default App;
