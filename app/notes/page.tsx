"use client";

import Form from "@/app/notes/components/form";
import NoteCard from "@/app/notes/components/note";
import useNotes from "@/app/notes/hooks/useNotes";
import Loading from "@/app/loading";
import Error from "@/app/error";

const notes = [
  { id: "1", title: "Note 1", content: "Content 1", isImportant: true },
  { id: "2", title: "Note 2", content: "Content 2", isImportant: false },
];

const NotesPage = () => {
  const { notes, isLoading, isError, deleteNote, updateNote } = useNotes();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Form />
      {notes?.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
    </div>
  );
};

export default NotesPage;
