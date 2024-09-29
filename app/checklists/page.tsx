"use client";

import { useState, useEffect } from "react";
import Form from "./components/form";
import Tags from "./components/tags";
import Item from "./components/item";
import useItems from "./hooks/useItems";
import useTags from "./hooks/useTags";
import { Item as ItemType } from "@/app/checklists/types/item";
import { Tag } from "@/app/checklists/types/tag";
import Loading from "@/app/loading";
import Error from "@/app/error";

const Checklists = () => {
  const {
    items,
    isLoading: isLoadingItems,
    isError: isErrorItems,
    updateItem,
    deleteItem,
  } = useItems();
  const {
    tags,
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useTags();

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    setSelectedTags((prevSelectedTags: Tag[]) =>
      prevSelectedTags.filter((selectedTag: Tag) =>
        tags.some((tag: Tag) => tag.id === selectedTag.id)
      )
    );
  }, [tags]);

  const filteredItems = items.filter((item: ItemType) => {
    return selectedTags.length === 0 || selectedTags.some((tag: Tag) => item.tags.some((t: Tag) => t.id === tag.id));
  });

  if (isLoadingItems || isLoadingTags) {
    return <Loading />;
  }

  if (isErrorItems || isErrorTags) {
    return <Error />;
  }

  const onDelete = async (id: string) => {
    await deleteItem(id);
  };

  const onUpdate = async (id: string, item: ItemType) => {
    await updateItem(id, item);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Form />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Tags tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
        <div className="w-full flex flex-col gap-4">
          {
            filteredItems.length > 0 ? (
              filteredItems.map((item: ItemType) => (
                <Item key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
              ))
            ) : (
              <div>No items found.</div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Checklists;
