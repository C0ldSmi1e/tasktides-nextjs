"use client";

import React, { useState } from "react";
import useNotes from "@/app/notes/hooks/useNotes";
import { Star } from "@/components/SVG";

const Form = () => {
  const wordLimit = 300;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addNote } = useNotes();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= wordLimit) {
      setContent(newContent);
    }
  };

  const onChangeIsImportant = () => {
    setIsImportant(!isImportant);
  };

  const onAddNote = async () => {
    if (title === "" || content === "") {
      alert("Title and content are required");
      return;
    }

    setIsSubmitting(true);

    await addNote({ title, content, isImportant });

    setTitle("");
    setContent("");
    setIsImportant(false);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-black rounded-md p-4">
      <div className="flex items-center gap-2">
        <input
          className="outline-none border-none w-full"
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="Title"
          maxLength={50}
        />
        <button onClick={onChangeIsImportant}>
          <Star important={isImportant} />
        </button>
      </div>
      <div className="relative">
        <textarea
          className="outline-none border-none resize-none h-24 w-full"
          value={content}
          onChange={onChangeContent}
          placeholder="Content"
          maxLength={wordLimit}
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {content.length}/{wordLimit}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="w-32 p-2 rounded-md border-2 border-black"
          onClick={onAddNote}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </div>
  );
};

export default Form;
