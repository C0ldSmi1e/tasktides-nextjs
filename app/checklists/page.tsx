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
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setSelectedTags((prevSelectedTags: Tag[]) =>
      prevSelectedTags.filter((selectedTag: Tag) =>
        tags?.some((tag: Tag) => tag.id === selectedTag.id)
      )
    );
  }, [tags]);

  const filteredItems = items.filter((item: ItemType) => {
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag: Tag) => item.tags.some((t: Tag) => t.id === tag.id));
    return searchMatch && tagMatch;
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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClear = () => {
    setSearch("");
    setSelectedTags([]);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Form />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <div className="border-2 border-black rounded-md p-2 flex-grow">
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none border-none text-sm"
                onChange={onSearch}
                value={search}
              />
            </div>
            <button
              className="border-2 border-black px-2 py-1 rounded text-sm"
              onClick={onClear}
            >
              Clear
            </button>
          </div>
          <Tags tags={tags || []} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
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
