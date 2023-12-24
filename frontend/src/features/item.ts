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
  let response: Response;
  try {
    response = await get("/items", idToken);
    console.info(response);
    if (response.ok) {
      return ItemsSchema.parse(response.body);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
  throw toError(response);
};

export const addItem = async (idToken: string, item: AddItemType) => {
  try {
    await post("/items", idToken, JSON.stringify(item));
  } catch (e) {
    console.error(e);
    throw e;
  }
};
