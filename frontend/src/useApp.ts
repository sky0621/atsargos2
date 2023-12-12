import { useState } from "react";

export const useApp = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = () => {
    setLoggedIn(true);
  };

  return { loggedIn, login };
};
