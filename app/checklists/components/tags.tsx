"use client";

import { Tag } from "@/app/checklists/types/tag";

const Tags = ({
  tags,
  selectedTags,
  setSelectedTags,
}: {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
}) => {
  const onClickTag = (tag: Tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="w-full flex flex-row flex-wrap gap-2">
      {tags?.length > 0 ? (
        <>
          {tags.map((tag) => {
            const isSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => onClickTag(tag)}
                className={`border-2 border-black px-2 py-1 rounded text-left text-sm ${isSelected ? "bg-black text-white" : ""}`}
              >
                {tag.name}
              </button>
            );
          })}
        </>
      ) : (
        <div>No tags found.</div>
      )}
    </div>
  );
};

export default Tags;
