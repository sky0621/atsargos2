import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import { AuthProvider } from "./pages/components/AuthProvider.tsx";
import AppContent from "./pages/components/AppContent.tsx";

function App() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Atsargos2</Header>
      <Content className={styles.content}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Content>
    </Layout>
  );
}

export default App;
