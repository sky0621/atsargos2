import DashboardPage from "../Dashboard/Dashboard.tsx";
import LoginPage from "../Login/Login.tsx";
import { useAuthContext } from "./AuthProvider.tsx";
import { Spin } from "antd";

const AppContent = () => {
  console.info("AppContent");
  const { user } = useAuthContext();

  if (typeof user === "undefined") {
    return <Spin fullscreen={true} />;
  }

  return (
    <>
      {user && <DashboardPage />}
      {!user && <LoginPage />}
    </>
  );
};

export default AppContent;
