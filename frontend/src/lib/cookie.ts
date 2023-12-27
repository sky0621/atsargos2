import { useCookies } from "react-cookie";
import { ID_TOKEN_COOKIE_KEY } from "./constants.ts";

export const getIdTokenFromCookie = (): string => {
  const [cookies] = useCookies([ID_TOKEN_COOKIE_KEY]);
  return cookies[ID_TOKEN_COOKIE_KEY];
};
