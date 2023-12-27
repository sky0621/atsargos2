import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import { AuthProvider } from "./pages/components/AuthProvider.tsx";
import AppContent from "./pages/components/AppContent.tsx";
import AppHeader from "./pages/components/AppHeader/AppHeader.tsx";

function App() {
  return (
    <AuthProvider>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div>Atsargos2</div>
          <AppHeader />
        </Header>
        <Content className={styles.content}>
          <AppContent />
        </Content>
      </Layout>
    </AuthProvider>
  );
}

export default App;
