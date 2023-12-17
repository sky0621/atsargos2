import { Button, Flex, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import { useApp } from "./useApp.ts";
import DashboardPage from "./pages/Dashboard/Dashboard.tsx";

function App() {
  const { loggedIn, login, items } = useApp();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>atsargos2</Header>
      <Content className={styles.content}>
        {loggedIn && <DashboardPage items={items} />}
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
