import { useEffect, useState } from 'react';
import styles from "./app.module.scss";
import Login from './login';
import { fetchUser } from './services/api/login';
import { msg } from "@/tools";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    msg.success('login')
    fetchUser().then(res => {
      console.log(res)
    })
  }, []);
  return (
    <div>
      {isLogin ? <div></div> : <Login />}
      <div className={styles.subtitle}>123</div>
    </div>
  );
}

export default App;
