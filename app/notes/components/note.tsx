"use client";

import { Note } from "@/app/notes/types/note";
import { Star } from "@/components/SVG";
import { useState } from "react";

const wordLimit = 300;

const NoteCard = ({
  note,
  onDelete,
  onUpdate,
}: {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, note: Note) => void;
}) => {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(note.title);

  const [isEditingContent, setIsEditingContent] = useState(false);
  const [content, setContent] = useState(note.content);

  const onClickTitle = () => {
    setIsEditingTitle(true);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onSaveTitle = () => {
    if (title === "") {
      alert("Title is required");
      setTitle(note.title);
      return;
    }
    setIsEditingTitle(false);
    onUpdate(note.id, { ...note, title });
  };

  const onBlurTitle = () => {
    onSaveTitle();
  };

  const onKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSaveTitle();
    }
    if (e.key === "Escape") {
      setTitle(note.title || "");
      setIsEditingTitle(false);
    }
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onClickContent = () => {
    setIsEditingContent(true);
  };

  const onSaveContent = () => {
    if (content === "") {
      alert("Content is required");
      setContent(note.content || "");
      return;
    }
    setIsEditingContent(false);
    onUpdate(note.id, { ...note, content });
  };

  const onBlurContent = () => {
    onSaveContent();
  };

  const onKeyDownContent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      onSaveContent();
    }
    if (e.key === "Escape") {
      setContent(note.content || "");
      setIsEditingContent(false);
    }
  };

  const toggleImportant = () => {
    onUpdate(note.id, {
      ...note,
      isImportant: !note.isImportant,
    });
  };

  return (
    <div className="flex flex-col gap-2 border-2 border-black rounded-md p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <button onClick={toggleImportant}>
            <Star important={note.isImportant} />
          </button>
          {isEditingTitle ? (
            <input
              className="outline-none border-none w-full"
              value={title}
              onChange={onTitleChange}
              onBlur={onBlurTitle}
              onKeyDown={onKeyDownTitle}
            />
          ) : (
            <h3 className="text-lg font-bold" onClick={onClickTitle}>
              {title}
            </h3>
          )}
        </div>
        <button onClick={() => onDelete(note.id)}>X</button>
      </div>
      {isEditingContent ? (
        <div className="relative">
          <textarea
            className="outline-none border-none resize-none h-24 w-full"
            value={content}
            onChange={onContentChange}
            onBlur={onBlurContent}
            onKeyDown={onKeyDownContent}
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {content.length}/{wordLimit}
          </div>
        </div>
      ) : (
        <p className="text-sm" onClick={onClickContent}>
          {content}
        </p>
      )}
    </div>
  );
};

export default NoteCard;