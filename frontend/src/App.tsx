import { Button, Layout } from "antd";
import { useState } from "react";
import { Content, Header } from "antd/es/layout/layout";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <Layout>
      <Header
        style={{
          fontSize: "24px",
          color: "white",
          textAlign: "center",
          backgroundColor: "darkgoldenrod",
        }}
      >
        atsargos2
      </Header>
      <Content style={{ height: "100%", padding: "16px" }}>
        {loggedIn && <>HOME</>}
        {!loggedIn && <Button onClick={login}>LOGIN</Button>}
      </Content>
    </Layout>
  );
}

export default App;
