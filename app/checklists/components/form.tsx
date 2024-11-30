"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import useTags from "../hooks/useTags";
import useItems from "../hooks/useItems";
import { Tag, TagOption } from "../types/tag";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { format, parse } from "date-fns";
import { Star } from "@/components/SVG";

const Form = () => {
  const { tags, isLoading, isError } = useTags();
  const { addItem } = useItems();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isImportant, setIsImportant] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const options = tags?.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
    __isNew__: false,
  }));

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const date = parse(dateValue, "yyyy-MM-dd", new Date());
      setDueDate(date);
    } else {
      setDueDate(null);
    }
  };

  const onChangeIsImportant = () => {
    setIsImportant(!isImportant);
  };

  const onChangeSelectedTags = (
    newValue: { value: string; label: string; __isNew__: boolean | undefined }[],
  ) => {
    setSelectedTags(newValue);
  };

  const formatDate = (date: Date | null): string => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    if (name === "") {
      alert("Name is required");
      setIsSubmitting(false);
      return;
    }

    const tags = selectedTags.map((tag) => ({
      id: tag.value,
      name: tag.label,
      items: [],
    }));

    await addItem({ name, description, dueDate, isImportant, tags });

    setName("");
    setDescription("");
    setDueDate(null);
    setSelectedTags([]);
    setIsImportant(false);
    setIsSubmitting(false);
  };


  return (<div className="w-full border-2 border-black rounded-md p-4 flex flex-col gap-4">
    <div className="w-full flex justify-between">
      <input
        className="outline-none border-none"
        type="text"
        placeholder="Name"
        onChange={onChangeName}
        value={name}
      />
      <input
        className="outline-none border-none"
        type="date"
        placeholder="Due Date"
        onChange={onChangeDueDate}
        value={formatDate(dueDate)}
      />
      <button onClick={onChangeIsImportant}>
        <Star important={isImportant} />
      </button>
    </div>
    <input className="w-full outline-none border-none" type="text" placeholder="Description" onChange={onChangeDescription} value={description} />
    <div className="w-full flex justify-between gap-2 items-center gap-4">
      <CreatableSelect
        className="w-full"
        placeholder="Tags"
        isMulti
        isSearchable
        options={options}
        onChange={(newValue) => onChangeSelectedTags(newValue as TagOption[])}
        value={selectedTags}
      />
      <button
        className="w-24 p-2 rounded-md border-2 border-black"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Item"}
      </button>
    </div>
  </div>
  );
};

export default Form;
