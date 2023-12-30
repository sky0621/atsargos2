import { Avatar, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuthContext } from "../AuthProvider.tsx";
import { signOutByGoogle } from "../../../lib/firebase.ts";
import styles from "./styles.module.css";
import React from "react";

const AppHeader = () => {
  console.info("AppHeader");
  const { user } = useAuthContext();

  const confirm = async (_?: React.MouseEvent<HTMLElement>) => {
    await signOutByGoogle();
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.section}>
      <Popconfirm
        title="Would you like to sign out?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Avatar icon={<UserOutlined />} />
      </Popconfirm>
    </div>
  );
};

export default AppHeader;
