import styles from "./index.module.scss";
import Footer from "./footer";
import LoginIn from "./loginin";

/*
 * @Description 登录页
 * @Author shenyangguang
 * @Date 2023/12/08
 */

function Login() {
  return (
    <div className={styles.container}>
      <LoginIn />
      <Footer />
    </div>
  );
}

export default Login;
