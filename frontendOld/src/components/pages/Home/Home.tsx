import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { idTokenState } from "../../../state/idToken/idTokenAtom.ts";

const HomePage = () => {
  const navigate = useNavigate();
  const idToken = useRecoilValue(idTokenState);

  useEffect(() => {
    if (idToken == "") {
      navigate("/login");
    }
  }, []);
  return <>Home</>;
};

export default HomePage;