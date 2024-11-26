import useSWR, { mutate } from "swr";
import { StandardResponse } from "@/types/StandardResponse";
import { Item } from "@/app/checklists/types/item";
import { Tag } from "@/app/checklists/types/tag";
import useTags from "./useTags";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: StandardResponse<Item[]> = await res.json();
  if (!data.success) {
    throw new Error(data.error || "An error occurred");
  }
  return data.data;
};

const useItems = () => {
  const {
    data: items,
    isLoading,
    error,
  } = useSWR("api/checklists/items", fetcher);
  const { cleanupTags } = useTags();
  const addItem = async ({
    name,
    description,
    dueDate,
    isImportant,
    tags,
  }: {
    name: string;
    description: string;
    dueDate: Date | null;
    isImportant: boolean;
    tags: Tag[];
  }) => {
    try {
      const res = await fetch("api/checklists/items", {
        method: "POST",
        body: JSON.stringify({ name, description, dueDate, isImportant, tags }),
      });
      const data: StandardResponse<Item> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      await mutate("api/checklists/items");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`api/checklists/items/${id}`, {
        method: "DELETE",
      });
      const data: StandardResponse<Item> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }

      await cleanupTags();

      await mutate("api/checklists/items");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (id: string, item: Item) => {
    try {
      const res = await fetch(`api/checklists/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(item),
      });
      const data: StandardResponse<Item> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      await cleanupTags();
      await mutate("api/checklists/items");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    items: sortItems(items || []),
    isLoading,
    isError: error,
    addItem,
    deleteItem,
    updateItem,
  };
};

const sortItems = (items: Item[]): Item[] => {
  return items.sort((a, b) => {

    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }

    if (a.isImportant !== b.isImportant) {
      return a.isImportant ? -1 : 1;
    }

    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (a.dueDate) {
      return -1;
    } else if (b.dueDate) {
      return 1;
    }

    return 0;
  });
};


export default useItems;