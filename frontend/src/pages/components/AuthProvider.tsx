import type { User } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { firebaseAuth } from "../../lib/firebase.ts";

export type AuthState = {
  user: User | null | undefined;
};

const initialState: AuthState = {
  user: undefined,
};

const AuthContext = createContext<AuthState>(initialState);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthState>(initialState);

  useEffect(() => {
    console.info("[AuthProvider] check auth");
    try {
      return onAuthStateChanged(
        firebaseAuth,
        (user: User | null | undefined) => {
          console.info("[AuthProvider] authenticated", user);
          setUser({ user });
        },
      );
    } catch (e) {
      console.error("[AuthProvider]", e);
      setUser(initialState);
      throw e;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
