"use client";

import { Tag } from "@/app/checklists/types/tag";

const Tags = ({ tags, selectedTags, setSelectedTags }: { tags: Tag[]; selectedTags: Tag[]; setSelectedTags: (tags: Tag[]) => void }) => {

  const onClickTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="w-full flex flex-row flex-wrap gap-2">
      {tags?.length > 0 ? (
        <>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onClickTag(tag)}
              className={`border-2 border-black px-2 py-1 rounded ${selectedTags.includes(tag) ? "bg-black text-white" : ""}`}
            >
              {tag.name}
            </button>
          ))}
        </>
      ) : (
        <div>No tags found.</div>
      )}
      <div className="mt-4 w-full flex justify-start">
        <button className="border-2 border-black px-2 py-1 rounded" onClick={() => setSelectedTags([])}>Clear</button>
      </div>
    </div>
  );
};

export default Tags;
