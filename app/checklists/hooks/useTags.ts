import useSWR, { useSWRConfig } from "swr";
import { StandardResponse } from "@/types/StandardResponse";
import { Tag } from "@/app/checklists/types/tag";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: StandardResponse<Tag[]> = await res.json();
  if (!data.success) {
    throw new Error(data.error || "An error occurred");
  }
  return data.data;
};

const useTags = () => {
  const { data: tags, isLoading, error } = useSWR("api/checklists/tags", fetcher);
  const { mutate } = useSWRConfig();

  const getTag = async (id: string) => {
    try {
      const res = await fetch(`api/checklists/tags/${id}`);
      const data: StandardResponse<Tag> = await res.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addTag = async ({ name, count }: { name: string; count: number }) => {
    try {
      const res = await fetch("api/checklists/tags", {
        method: "POST",
        body: JSON.stringify({ name, count }),
      });
      const data: StandardResponse<Tag> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      mutate("api/checklists/tags");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTag = async (tagId: string, newTag: Tag) => {
    try {
      const res = await fetch(`api/checklists/tags/${tagId}`, {
        method: "PUT",
        body: JSON.stringify(newTag),
      });
      const data: StandardResponse<Tag> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      mutate("api/checklists/tags");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTag = async (tagId: string) => {
    try {
      const res = await fetch(`api/checklists/tags/${tagId}`, {
        method: "DELETE",
      });
      const data: StandardResponse<Tag> = await res.json();
      if (!data.success) {
        throw new Error(data.error || "An error occurred");
      }
      mutate("api/checklists/tags");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const cleanupTags = async () => {
    try {
      const res = await fetch("api/checklists/tags/cleanup", {
        method: "POST",
      });
      const data: StandardResponse<Tag[]> = await res.json();
      mutate("api/checklists/tags");
      return data?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const revalidateTags = () => {
    mutate("api/checklists/tags");
  };

  return {
    tags,
    isLoading,
    isError: error,
    getTag,
    addTag,
    updateTag,
    deleteTag,
    cleanupTags,
    revalidateTags,
  };
};

export default useTags;