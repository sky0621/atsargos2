import { useEffect, useState } from "react";
import { Item, listItem } from "../../../../features/item.ts";
import { useAuthContext } from "../../../components/AuthProvider.tsx";

export const useItemList = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<Item[]>();

  // MEMO: local frontend 確認用の措置
  useEffect(() => {
    // setItems([
    //   {
    //     id: "56A50FAC-F459-48A8-8594-1B050AE620BC",
    //     name: "item01",
    //     date: "2023-10-10",
    //     notify: 1,
    //     url: "https://1.img-dpreview.com/files/p/TS1200x900~sample_galleries/7359875737/4323139542.jpg",
    //   },
    //   {
    //     id: "E859C8B3-8F9A-4591-A77C-02803C1DBAFD",
    //     name: "item02",
    //     date: "2023-10-15",
    //     notify: 0,
    //     url: "https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/7359875737/4450728102.jpg",
    //   },
    //   {
    //     id: "E7028926-69F0-4C5B-B147-2B0C16ECA6F2",
    //     name: "item03",
    //     date: "2023-10-20",
    //     notify: 2,
    //     url: "https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/7359875737/2745320457.jpg",
    //   },
    //   {
    //     id: "BCA751BE-4458-458D-854C-463F65521632",
    //     name: "item04",
    //     date: "2023-10-25",
    //     notify: 1,
    //     url: "https://2.img-dpreview.com/files/p/TS1200x900~sample_galleries/7359875737/4334521074.jpg",
    //   },
    //   {
    //     id: "B94CAD26-4107-4C6A-9128-0D033A5A9364",
    //     name: "item05",
    //     date: "2023-10-30",
    //     notify: 0,
    //     url: "https://3.img-dpreview.com/files/p/TS1200x900~sample_galleries/7359875737/2941778981.jpg",
    //   },
    // ]);
    (async () => {
      const idToken = await user?.getIdToken();
      if (!idToken) {
        throw new Error();
      }
      setItems(await listItem(idToken));
    })();
  }, []);

  return { items };
};
