import { z } from "zod";
import { get, post, put } from "../lib/api.ts";
import { toError } from "../lib/error.ts";
import { AddItemType } from "../pages/Dashboard/components/AddItem/addItem.ts";
import { EditItemType } from "../pages/Dashboard/components/EditItem/editItem.ts";

export const ItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  notify: z.number(),
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
  console.info("[addItem] start", item);
  try {
    const body = JSON.stringify(item);
    console.info("[addItem] body", body);
    await post("/items", idToken, body);
  } catch (e) {
    console.error("[addItem] got error", e);
    throw e;
  }
};

export const editItem = async (idToken: string, item: EditItemType) => {
  console.info("[editItem] start", item);
  try {
    const body = JSON.stringify(item);
    console.info("[editItem] body", body);
    await put("/items", idToken, body);
  } catch (e) {
    console.error("[editItem] got error", e);
    throw e;
  }
};
