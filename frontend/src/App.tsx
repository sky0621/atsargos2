import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import DashboardPage from "./pages/Dashboard/Dashboard.tsx";
import LoginPage from "./pages/Login/Login.tsx";
import { useState } from "react";
import AuthCheck from "./pages/components/AuthCheck/AuthCheck.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Atsargos2</Header>
      <Content className={styles.content}>
        <AuthCheck>
          {loggedIn && <DashboardPage />}
          {!loggedIn && <LoginPage setLoggedIn={setLoggedIn} />}
        </AuthCheck>
      </Content>
    </Layout>
  );
}

export default App;
