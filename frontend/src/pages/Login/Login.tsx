import { Button, Flex } from "antd";
import styles from "./styles.module.css";
import { useLogin } from "./useLogin.ts";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const LoginPage = (props: Props) => {
  const { login } = useLogin(props.setLoggedIn);
  return (
    <Flex justify="center">
      <Button className={styles.loginButton} onClick={login}>
        LOGIN
      </Button>
    </Flex>
  );
};

export default LoginPage;
