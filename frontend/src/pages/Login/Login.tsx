import { Button, Flex } from "antd";
import styles from "./styles.module.css";
import { useLogin } from "./useLogin.ts";

const LoginPage = () => {
  const { login } = useLogin();

  return (
    <Flex justify="center">
      <Button className={styles.loginButton} onClick={login}>
        LOGIN
      </Button>
    </Flex>
  );
};

export default LoginPage;
