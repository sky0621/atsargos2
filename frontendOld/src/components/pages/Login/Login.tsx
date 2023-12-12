import { Button, Row } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { idTokenState } from "../../../state/idToken/idTokenAtom.ts";
import { auth, provider } from "../../../lib/firebase.ts";

const LoginPage = () => {
  const navigate = useNavigate();
  const [, setIdToken] = useRecoilState(idTokenState);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user.email) {
        console.error("no user email");
        throw new Error();
      }

      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        console.error("no credential");
        throw new Error();
      }

      const user = result.user;
      const idToken = await user.getIdToken();
      setIdToken(idToken);

      navigate("/");
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  };
  return (
    <Row>
      <Button type="primary" onClick={login}>
        Login
      </Button>
    </Row>
  );
};

export default LoginPage;
