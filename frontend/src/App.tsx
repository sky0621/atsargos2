import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.css";
import { AuthProvider } from "./pages/components/AuthProvider.tsx";
import AppContent from "./pages/components/AppContent.tsx";
import AppHeader from "./pages/components/AppHeader/AppHeader.tsx";
import AddItemModal from "./pages/Dashboard/components/AddItem/AddItemModal/AddItemModal.tsx";
import AddItemButton from "./pages/Dashboard/components/AddItem/AddItemButton/AddItemButton.tsx";
import { useDashboard } from "./pages/Dashboard/useDashboard.ts";

function App() {
  const { showAddModal, setShowAddModal } = useDashboard();

  return (
    <AuthProvider>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <AddItemButton setShowAddModal={setShowAddModal} />
          <AddItemModal
            isOpen={showAddModal}
            setShowAddModal={setShowAddModal}
          />
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
