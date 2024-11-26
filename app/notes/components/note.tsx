import { Note } from "@/app/notes/types/note";
import { Star } from "@/components/SVG";

const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 border-2 border-black rounded-md p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Star important={note.isImportant} />
          <h3 className="text-lg font-bold">{note.title}</h3>
        </div>
        <button onClick={() => onDelete(note.id)}>X</button>
      </div>
      <p className="text-sm">{note.content}</p>
    </div>
  );
};

export default NoteCard;