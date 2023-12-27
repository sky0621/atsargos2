import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthCheck = (props: Props) => {
  return <>{props.children}</>;
};

export default AuthCheck;
