import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import DashboardPage from "./pages/Dashboard/Dashboard.tsx";
import LoginPage from "./pages/Login/Login.tsx";
import { useState } from "react";

function App() {
  // FIXME: local 動作確認用に true にしておく
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>atsargos2</Header>
      <Content className={styles.content}>
        {loggedIn && <DashboardPage />}
        {!loggedIn && <LoginPage setLoggedIn={setLoggedIn} />}
      </Content>
    </Layout>
  );
}

export default App;
