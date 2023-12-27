import { z } from "zod";
import { get, post } from "../lib/api.ts";
import { toError } from "../lib/error.ts";
import { AddItemType } from "../pages/Dashboard/components/AddItem/addItem.ts";

export const ItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  notify: z.number(),
  url: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemsSchema = z.array(ItemSchema);

export type Items = z.infer<typeof ItemsSchema>;

export const listItem = async (idToken: string): Promise<Items> => {
  console.info("[listItem] start");
  let response: Response;
  try {
    response = await get("/items", idToken);
    console.info("[listItem] got response", response);
    if (response.ok) {
      const jsonBody = await response.json();
      console.info("[listItem] got json", jsonBody);
      return ItemsSchema.parse(jsonBody);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
  throw toError(response);
};

export const addItem = async (idToken: string, item: AddItemType) => {
  console.info("[addItem] start");
  try {
    await post("/items", idToken, JSON.stringify(item));
  } catch (e) {
    console.error(e);
    throw e;
  }
};
