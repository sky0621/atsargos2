import { selector } from "recoil";
import { idTokenState } from "./idTokenAtom.ts";

export const idTokenSelector = selector({
  key: "idTokenState",
  get: ({ get }) => {
    return get(idTokenState);
  },
});
