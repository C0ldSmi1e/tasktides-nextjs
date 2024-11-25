"use client";

import React, { useState } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { Item as ItemType } from "@/app/checklists/types/item";
import { Star } from "@/components/SVG";
import CreatableSelect from "react-select/creatable";
import useTags from "@/app/checklists/hooks/useTags";
import { Tag } from "@/app/checklists/types/tag";
import { TagOption } from "@/app/checklists/types/tag";


const Item = ({
  item,
  onDelete,
  onUpdate,
}: {
  item: ItemType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, item: ItemType) => void;
}) => {
  const { tags, isLoading, isError } = useTags();

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(item.name);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(item.description ?? "");

  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [dueDate, setDueDate] = useState<string>(item.dueDate ? new Date(item.dueDate).toISOString().split("T")[0] : "");

  const [isEditingTags, setIsEditingTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>(item.tags.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
    __isNew__: false,
  })));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }


  const options = tags ? tags.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
    __isNew__: false,
  }))
    : [];

  const toggleDone = () => {
    if (item.isDone) {
      onUpdate(item.id, { ...item, isDone: false });
    } else {
      onUpdate(item.id, { ...item, isDone: true });
    }
  };

  const toggleImportant = () => {
    if (item.isImportant) {
      onUpdate(item.id, { ...item, isImportant: false });
    } else {
      onUpdate(item.id, { ...item, isImportant: true });
    }
  };

  const onClickName = () => {
    setIsEditingName(true);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSaveName = () => {
    if (name === "") {
      alert("Name is required");
      setName(item.name);
      return;
    }
    setIsEditingName(false);
    onUpdate(item.id, { ...item, name: name });
  };

  const onBlurName = () => {
    onSaveName();
  };

  const onKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSaveName();
    }
    if (e.key === "Escape") {
      setName(item.name);
      setIsEditingName(false);
    }
  };

  const onClickDescription = () => {
    setIsEditingDescription(true);
    setDescription(item.description ?? "");
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onBlurDescription = () => {
    onSaveDescription();
  };

  const onSaveDescription = () => {
    setIsEditingDescription(false);
    onUpdate(item.id, { ...item, description: description });
  };

  const onKeyDownDescription = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSaveDescription();
    }
    if (e.key === "Escape") {
      setDescription(item.description ?? "");
      setIsEditingDescription(false);
    }
  };

  const onClickDueDate = () => {
    setIsEditingDueDate(true);
  };

  const onChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setDueDate("");
    } else {
      setDueDate(e.target.value);
    }
  };

  const onBlurDueDate = () => {
    onSaveDueDate();
  };

  const onKeyDownDueDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSaveDueDate();
    }
    if (e.key === "Escape") {
      setDueDate(item.dueDate ? new Date(item.dueDate).toISOString().split("T")[0] : "");
      setIsEditingDueDate(false);
    }
  };

  const onSaveDueDate = () => {
    setIsEditingDueDate(false);
    const updatedDueDate: Date | null = dueDate ? new Date(dueDate) : null;
    onUpdate(item.id, { ...item, dueDate: updatedDueDate });
  };

  const onClickTags = () => {
    setIsEditingTags(true);
  };

  const onChangeSelectedTags = (
    newValue: { value: string; label: string; __isNew__: boolean | undefined }[],
  ) => {
    setSelectedTags(newValue);
  };

  const onSaveTags = async () => {
    const updatedTags = selectedTags.map((tag) => ({
      id: tag.value,
      name: tag.label,
      items: [],
    }));
    onUpdate(item.id, { ...item, tags: updatedTags });
    setIsEditingTags(false);
  };

  const onCancelTags = () => {
    setSelectedTags(item.tags.map((tag: Tag) => ({
      value: tag.id,
      label: tag.name,
      __isNew__: false,
    })));
    setIsEditingTags(false);
  };

  return (
    <div className="w-full border-2 border-black rounded-md p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          {isEditingName ? (
            <input
              className="outline-none border-none"
              type="text"
              value={name}
              onChange={onChangeName}
              onBlur={onBlurName}
              onKeyDown={onKeyDownName}
            />
          ) : (
            <span className="cursor-pointer flex flex-row gap-2 items-center" onClick={onClickName}>
              {item.isDone ?
                <span className="text-green-500">✅</span> :
                ""
              }
              {name}
            </span>
          )}
          {isEditingDueDate ? (
            <input
              className="outline-none border-none"
              type="date"
              value={dueDate}
              onChange={onChangeDueDate}
              onBlur={onBlurDueDate}
              onKeyDown={onKeyDownDueDate}
            />
          ) : (
            <span
              className="cursor-pointer"
              onClick={onClickDueDate}
            >
              {dueDate ? dueDate : "No due date."}
            </span>
          )}
          <button onClick={() => onDelete(item.id)}>X</button>
        </div>
        <div>
          {isEditingDescription ? (
            <input
              className="w-full outline-none border-none"
              type="text"
              value={description ?? ""}
              onChange={onChangeDescription}
              onBlur={onBlurDescription}
              onKeyDown={onKeyDownDescription}
            />
          ) : (
            <span
              className="cursor-pointer"
              onClick={onClickDescription}
            >
              {description ? description : "No description."}
            </span>
          )}
        </div>
        <div className="flex gap-4 justify-between">
          {isEditingTags ? (
            <div className="w-full flex flex-row gap-4">
              <CreatableSelect
                className="w-full"
                placeholder="Tags"
                isMulti
                isSearchable
                options={options}
                onChange={(newValue) => onChangeSelectedTags(newValue as TagOption[])}
                value={selectedTags}
              />
              <button onClick={onCancelTags}>Cancel</button>
              <button onClick={onSaveTags}>Save</button>
            </div>
          ) : (
            <>
              {selectedTags.length > 0 ? 
                <div className="flex gap-4 flex-wrap cursor-pointer" onClick={onClickTags}>
                  {selectedTags.map((tag) => (
                    <span key={tag.value} className="border-2 border-black rounded-md px-2 py-1 text-left text-sm">
                      {tag.label}
                    </span>
                  ))}
                </div>
                : <span className="cursor-pointer" onClick={onClickTags}>No tags.</span>
              }
            </>
          )}
          <div className="flex gap-4">
            {item?.isImportant ?
              (<button onClick={toggleImportant}>
                <Star important={item.isImportant} />
              </button>
              ) : (
                <button onClick={toggleImportant}>
                  <Star important={item.isImportant} />
                </button>
              )}
            {item?.isDone ?
              <button onClick={toggleDone}>Undo</button> :
              <button onClick={toggleDone}>Done</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
