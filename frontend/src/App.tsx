import { Button, Col, Flex, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import { useApp } from "./useApp.ts";

function App() {
  const { loggedIn, login, items } = useApp();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>atsargos2</Header>
      <Content className={styles.content}>
        {loggedIn && (
          <Row justify="center" align="middle">
            <Col>a</Col>
            {items?.map((item, idx) => <Col key={idx}>{item.name}</Col>)}
          </Row>
        )}
        {!loggedIn && (
          <Flex justify="center">
            <Button className={styles.loginButton} onClick={login}>
              LOGIN
            </Button>
          </Flex>
        )}
      </Content>
    </Layout>
  );
}

export default App;
